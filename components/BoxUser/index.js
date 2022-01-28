import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

export default function BoxUser(props) {
  const [username, setUsername] = useState(props.username)
  const router = useRouter()

  function handleSubmit(ev) {
    ev.preventDefault()
    router.push({ pathname: '/chat', query: { username: username }})
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{ props.title }</h1>
          <p>{ props.subtitle }</p>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" 
              autoCorrect="false"
              autoComplete="false"
              spellCheck="false"
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
          <a href={`https://github.com/${ username }`}>
          <Image
            width={192} height={192} 
            src={ 
              username.length > 3 
                ? `https://github.com/${ username }.png`
                : '/smith.jpg'
            }
            alt={`Foto do usuário ${ username }`}
            objectFit="contain" 
            quality={70}
            priority="false"
            className={styles.image}
          />
          </a>
          <p>{ username || "//" }</p>
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