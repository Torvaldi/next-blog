import config from "@config/config";
import Error from '@components/Error/Error';
import Container from '@components/Container';
import Box from '@material-ui/core/Box';
import Title from '@components/Title';
import Image from '@components/Image/Image';
import Info from '@components/Recipe/Info/Info';
import Ingredients from '@components/Recipe/Ingredients/Ingredients';
import { Item as Ustensil } from "@components/Recipe/Ustensil/Item";
import Carousel from '@components/Recipe/Ustensil/Carousel';
import {  getTotalCookTime, getTime } from 'app/helper';
import { FunctionComponent } from 'react';
import { List as StepsList } from '@components/Recipe/Step/List';

type RecipeProps = {
  recipe,
}

const Recipe :FunctionComponent<RecipeProps> = ({ recipe }) => {

  if (recipe === null) return <Error status={404} />;

  const renderUstensil = (items : Array<object>, limit : number) : JSX.Element => {
    if (items.length <= limit) {
      return(
        <Box display="flex">
          {items.map( (item) => {
            return <Box mr={3}><Ustensil item={item} /></Box>
          })}
        </Box>
      );
    }

    return (
      <Carousel items={items} limit={limit} />
    );

  }

  return (
    <Container type="full" bgcolor="primary.main">

      <Container display="flex" justifyContent="space-between" height={280}>

        <Box display="flex" flexDirection="column" justifyContent="flex-end" mb={2} ml={2}  >
          <Title size={1} m={0} color="white">{recipe.title}</Title>
          <Box mt={5} display="flex">
            <Info title="Difficulté" content={recipe.difficulty} mr={4} />
            <Info title="Temps total" content={getTotalCookTime(recipe.prep_time, recipe.cook_time)} mr={4} />
            <Info title="Temps de cuisson" content={getTime(recipe.cook_time)} mr={4} />
            <Info title="Temps de préparation" content={getTime(recipe.prep_time)} mr={4} />
          </Box>
        </Box>

      </Container>

      <Container display="flex">

        <Box mr={5} ml={2} width="100%">
          <Box mb={5} >
            <p>{recipe.description}</p>
          </Box>
          <Title size={2} mt={3} >Ustensiles</Title>
          <Box display="flex" mb={6}>
            {renderUstensil(recipe.utensils, 4)}
          </Box>
          <Box mb={5}>
            <Title size={2} mt={4} mb={0}>Etapes</Title>
            <StepsList steps={recipe.steps} />
          </Box>
        </Box>

        <Box width={380} mt={-30} mr={1} ml={1}>
          <Image width="380px" height="380px" 
            src={config.strapiUrl + recipe.cover.formats.small.url} 
            alt={`${recipe.title} photo`} 
          />
          <Box bgcolor="grey.200" p={2} mt={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Title size={2} m={0}>Ingredients</Title>
              <span>{recipe.person} personnes</span>
            </Box>
            <Box mt={3}>
              {recipe.ingredient.map((item) => {
                return <Ingredients amount={item.amount} item={item.ingredient} unit={item.unit} />
              })}
            </Box>
          </Box>
        </Box>

      </Container>

    </Container>
  );

}

export default Recipe;

export async function getServerSideProps({ query: { slug } }) {

  const reponseRecipes = await fetch(`${config.strapiUrl}/recipes?slug=${slug}`);
  let recipe = (await reponseRecipes.json() || []);

  if (recipe.length === 0) {
    recipe = null;
  }

  return {
    props: {
      recipe: recipe[0]
    }
  }

}