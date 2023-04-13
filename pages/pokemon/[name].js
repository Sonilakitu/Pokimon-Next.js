import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import PokemonCard from '@/components/PokemonCard';

const GET_POKEMON = gql`
  query pokemon($id: String){
    pokemon(id: $id){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
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

export default function PokemonDetail() {
  const router = useRouter();
  const { name } = router.query;
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { id: name },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  const pokemon = data?.pokemon;

  return (
    <div>
      <PokemonCard pokemon={pokemon} />
    </div>
  );
}
