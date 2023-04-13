import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: '#f9f9f9',
  },
  media: {
    width: 150,
    height: 150,
    objectFit: 'contain',
  },
  types: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  type: {
    background: '#eee',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
}));

const PokemonCard = ({ pokemon }) => {
  const classes = useStyles();
  const { id, name, image, height, weight, classification, types, weaknesses, resistant } = pokemon;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography variant="h6" component="h2">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Height: {height.minimum} - {height.maximum}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Weight: {weight.minimum} - {weight.maximum}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Classification: {classification}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Types:{' '}
          <span className={classes.types}>
            {types.map((type) => (
              <span key={type} className={classes.type}>
                {type}
              </span>
            ))}
          </span>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Weaknesses: {weaknesses.join(', ')}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          Resistant: {resistant.join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
