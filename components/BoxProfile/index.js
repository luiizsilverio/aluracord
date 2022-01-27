import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function BoxProfile(props) {
  const { username } = props
  const [info, setInfo] = useState({})

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo({
          name: data.name,
          location: data.location,
          bio: data.bio,
          blog: data.blog,
          html_url: data.html_url,
          email: data.email,
          followers: data.followers,
          following: data.following,
          public_repos: data.public_repos
        })
      })
      .catch(() => setInfo({}))
  }, [])

  return (
    <div className={ styles.container } >
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <a href={info?.html_url ? info.html_url : "/"}>
            <Image
              width={150} height={150} 
              src={`https://github.com/${ username }.png`}
              className={ styles.image }
            />
          </a>
        </div>
        <div className={styles.infoContainer}>
          <p>Usuário: <span>{ username }</span></p>
          <p>Nome: <span>{ info?.name }</span></p>
          <p>Localidade: <span>{ info?.location }</span></p>
          <p>Sobre mim: <span>{ info?.bio }</span></p>
          { info?.email && <p>E-mail: <span>{ info?.email }</span></p> }
          <p>Nº Seguidores: <span>{ info?.followers }</span></p>
          { info?.blog && <p><a href={ info?.blog }>Blog</a></p> }
        </div>
        <button onClick={ props.onClose }>Fechar</button>
      </div>
    </div>
  )
}
