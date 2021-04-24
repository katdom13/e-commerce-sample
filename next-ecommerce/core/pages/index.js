import { makeStyles } from "@material-ui/core/styles"
import Header from "../components/header"

const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc"
  }
}))

export default function Home() {

  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.example}>
        Kat
      </div>
    </>
  )
}
