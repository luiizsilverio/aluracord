import { useState } from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

export default function BoxUser(props) {
  const [username, setUsername] = useState(props.username)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{ props.title }</h1>
          <p>{ props.subtitle }</p>
          <form>
            <input type="text" 
              autoCorrect="false"
              autoComplete="false"
              maxLength={20}
              autoFocus
              required
              value={username} 
              placeholder='Usuário do Github'
              onChange={(e) => setUsername(e.target.value)}
            />
            <button>Entrar</button>          
          </form>
        </div>

        <div className={styles.img_container}>
          <Image
            width={192} height={192} 
            src={`https://github.com/${ username }.png`}
            alt={`Foto do usuário ${ username }`}
            priority="false"
            objectFit="contain" 
            quality={70}
            className={styles.image}
          />
          <p>{ username }</p>
        </div>

     
      </div>
    </>
  )
}

{/* <style jsx>{`              
h1 {
  color: ${appConfig.theme.colors.neutrals['000']};
  font-size: 24px;
  font-weight: 600;    
}

p {
  marginBottom: 32px;
  color: ${appConfig.theme.colors.neutrals['300']};
}

.content {
  
  
  box-shadow: 20px 20px 20px #ffffff; 

  background-color: ${appConfig.theme.colors.neutrals['700']};  
}  
  
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 50%;
  text-align: center;
  margin-bottom: 32px;
}
`}</style> */}