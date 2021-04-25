import { makeStyles } from "@material-ui/core/styles"
import Header from "../components/header"
import axios from 'axios'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc"
  },
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    // paddingTop: theme.spacing(40)
    height: theme.spacing(40),
  }
}))

export default function Home({ data }) {

  const classes = useStyles()

  return (
    <>
      <Header />
      <main>
        <Container maxWidth="lg" className={classes.cardGrid}>
          <Grid container spacing={2}>
            {
              data && data.map((d) => (
                <Link key={d.id} href=".">
                  <Grid item xs={6} sm={4} md={3}>
                    <Card>
                      <CardMedia
                        className={classes.cardMedia}
                        image={d.product_image[0].image}
                        alt={d.product_image[0].alt_text}
                      />
                      <CardContent>
                        <Typography gutterBottom component="p">
                          { d.title }
                        </Typography>
                        <Box component="p" fontSize={16} fontWeight={900}>
                          ₱{ d.regular_price }
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Link>
              ))
            }
          </Grid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps(context) {

  const { data } = await axios.get("http://127.0.0.1:8000/api/")

  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}
