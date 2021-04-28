import { makeStyles } from "@material-ui/core/styles"
import Header from "../../components/header"
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 0,
    borderRadius: 0,
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: 0,
    borderRadius: 0,
    marginLeft: 25,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: 0,
    borderRadius: 0,
    paddingLeft: 40,
    paddingTop: 30,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: '100%',
    [theme.breakpoints.down("sm")]: {
      maxWidth: '90%',
    },
  },
}))

export default function Product({ data, categories }) {

  const classes = useStyles()
  const router = useRouter()

  // fallback, wait for data not defined in static paths
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{ data.title }</title>
      </Head>
      {/* Navigation categories on header */}
      <Header data={categories}/>
      <main>
        <Container maxWidth="md">
          <Grid container spacing={0}>
            <Hidden only={"xs", "sm"}>
              <Grid item sm={1}>
                <Paper className={classes.paperImagePreview} elevation={0}>
                  {
                    data && data.product_image && data.product_image.map((product_image) => (
                      <div key={product_image.alt_text}>
                        <Paper className={classes.paperImage} elevation={0}>
                          <img
                            src={product_image.image}
                            alt={product_image.alt_text}
                            className={classes.img}
                          />
                        </Paper>
                      </div>
                    ))
                  }
                </Paper>
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paperImage} elevation={0}>
                <img
                  src={data.product_image[0].image}
                  alt={data.product_image[0].alt_text}
                  className={classes.img}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.paperRight} elevation={0}>
                <Box component="h1" fontSize={18} fontWeight="400">
                  { data.title }
                </Box>
                <Box component="p" fontSize={22} fontWeight="900" m={0}>
                  ₱{ data.regular_price }
                </Box>
                <Box component="p" fontSize={14} m={0}>
                  Free Delivery & Returns (Ts&Cs apply)
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps(context) {

  const product = await axios.get(`http://127.0.0.1:8000/api/${context.params.slug}/`)
  const categories = await axios.get("http://127.0.0.1:8000/api/category/")

  return {
    props: {
      data: product.data,
      categories: categories.data,
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  return {
    paths: [ { params: { slug: "men-clothes" } } ],
    fallback: true, //load first
  }
}