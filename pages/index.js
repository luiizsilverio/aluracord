import appConfig from '../config.json'

import styles from '../styles/home.module.scss'
import BoxUser from '../components/BoxUser'

function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <BoxUser 
          username="luiizsilverio"
          title="Bem vindo de volta!"
          subtitle="Discord - Alura Matrix"
        />
      </div>     
    </>
  )
}

export default HomePage
