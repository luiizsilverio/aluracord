import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from '../styles/chat.module.scss'

export default function Chat() {
  const router = useRouter()
  const username = useMemo(() => router.query.username, [router.query])
  const [mensagem, setMensagem] = useState('');
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const listaRef = useRef(null)

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
        id: listaDeMensagens.length + 1,
        de: username,
        texto: novaMensagem,
    };
    
    setListaDeMensagens([
        mensagem,
        ...listaDeMensagens,
    ]);
    setMensagem('');
  }

  const scrollToBottom = () => {
    listaRef.current.scrollTop = listaRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom()
  }, [listaDeMensagens])

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <h2>Chat</h2>
        <a href="#">Logout</a>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.listaContainer} ref={listaRef}>
          <ul className={styles.lista}>
          { 
            listaDeMensagens.map((mensagem) => (
              <li key={ mensagem.id }>
                <div>
                  <Image
                    width={20} height={20} 
                    src={`https://github.com/${ username }.png`}
                    className={ styles.image }
                  />
                  
                  <strong>
                    { mensagem.de }
                  </strong>

                  <span>
                    { new Date().toLocaleDateString() }
                  </span>
                </div>

                <p>{ mensagem.texto }</p>
              </li>
            ))
          }
          </ul>
        </div>
        

        <form>
          <textarea 
            placeholder='Digite sua mensagem aqui...'
            value={mensagem}
            onChange={(event) => setMensagem(event.target.value)}
            onKeyPress={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    handleNovaMensagem(mensagem);
                }
            }}
          />
        </form>
      </div>          
    </div>   
  )
}

function MessageList(props) {
  return (
    <>
    { props.mensagens.map((mensagem) => {
      <li key={ mensagem.id }>
        <div>
          <Image
            width={20} height={20} 
            src={`https://github.com/${ props.username }.png`}
            className={styles.image}
          />
          
          <strong>
            { mensagem.de }
          </strong>

          <span>
            { new Date().toLocaleDateString() }
          </span>
        </div>
        { mensagem.texto }
      </li>
    })}
   </>
  )  
}
