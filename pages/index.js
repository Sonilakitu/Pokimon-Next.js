import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    fontSize: '1.5rem',
    padding: '1rem 2rem',
  },
  prevButton: {
    marginRight: '1rem',
  },
  nextButton: {
    marginLeft: '1rem',
  },
  card: {
    minWidth: 175,
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  type: {
    marginRight: theme.spacing(1),
  },
  image: {
    width: 150,
    height: 150,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;



const TodoList = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {data.map((item) => (
        <div key={item.id} style={{ width: '200px', margin: '20px' }}>
          <img src={item.image} alt={item.name} />
          <p>Number: {item.number}</p>
          <p>Name: {item.name}</p>
          <p>Types: {item.types.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

const Todo = ({ total, offset }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: total },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  const { pokemons } = data;

  return (
    <Grid container className={classes.root} spacing={3}>
      {pokemons.slice(offset, offset + 20).map((pokemon) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
          <Card className={classes.card}>
            <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                {pokemon.name}
              </Typography>
              <Typography className={classes.number} color="textSecondary">
                {pokemon.number}
              </Typography>
              {pokemon.types.map((type) => (
                <Typography key={type} className={classes.type}>
                  {type}
                </Typography>
              ))}
            </CardContent>
          </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default function Home({ client }) {
  const [offset, setOffset] = React.useState(0);
  const classes = useStyles();

  return (
    <div>
      <Todo total={100} offset={offset} />
      <Grid container justify="space-between">
        <Grid item>
          <button className={`${classes.button} ${classes.prevButton}`} disabled={offset === 0} onClick={() => setOffset((o) => o - 20)}>
            Previous
          </button>
        </Grid>
        <Grid item>
          <button className={`${classes.button} ${classes.nextButton}`} disabled={offset + 20 >= 100} onClick={() => setOffset((o) => o + 20)}>
            Next
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
