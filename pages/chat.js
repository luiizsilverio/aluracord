import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import Modal from 'react-modal'

import styles from '../styles/chat.module.scss'
import BoxProfile from '../components/BoxProfile'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

Modal.setAppElement('#__next')

export default function Chat() {
  const router = useRouter()
  const username = useMemo(() => router.query.username, [router.query])
  const [mensagem, setMensagem] = useState('');
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const listaRef = useRef(null)
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")

  useEffect(() => {
    supabase.from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then((response) => {
        const lista = []
        response.data.map((data) => {
          lista.push({
            id: data.id,
            de: data.from,
            texto: data.message,
            data: new Date(data.created_at)
          })
        })
        setListaDeMensagens(lista)
      })

    setSelectedUser(username)
  }, [])

  function handleNovaMensagem(novaMensagem) {
    supabase.from('mensagens')
      .insert([
        {
          from: username,
          message: novaMensagem
        }
      ])
      .then(({ data }) => {
        const mensagem = {
          id: data[0].id,
          de: data[0].from,
          texto: data[0].message,
          data: new Date(data[0].created_at)
        }

        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens,
        ]);
      })

    setMensagem('');
  }

  const scrollToBottom = () => {
    listaRef.current.scrollTop = listaRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom()
  }, [listaDeMensagens])

  return (
  <>
    <Modal isOpen={ showProfile } 
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      >
      <BoxProfile 
        username={selectedUser} 
        onClose={() => setShowProfile(false)}
      />
    </Modal>

    <div className={styles.content}>     
      <header className={styles.header}>
        <h2>Chat</h2>
        <a href="/">Logout</a>
      </header>

      <div className={styles.formContainer}>
        <div className={styles.listaContainer} ref={listaRef}>
          <ul className={styles.lista}>
          { 
            listaDeMensagens.map((mensagem) => (
              <li key={ mensagem.id }>
                <div className={ styles.itemLista }>
                  <div>
                    <Image
                      width={20} height={20} 
                      src={`https://github.com/${ mensagem.de }.png`}
                      className={ styles.image }
                      onClick={() => {
                        setSelectedUser(mensagem.de)
                        setShowProfile(true)
                      }}
                    />
                  </div>
                  
                  <strong>
                    { mensagem.de }
                  </strong>

                  <span>
                    { mensagem.data.toLocaleString() }
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
            wrap='true'
            onChange={(event) => setMensagem(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && mensagem.trim()) {
                event.preventDefault();
                handleNovaMensagem(mensagem);
              }
            }}            
          />

          <button type="button" onClick={(event) => {
            // event.preventDefault();
            if (mensagem.trim()) {
              handleNovaMensagem(mensagem);
            }
          }}>
            Enviar
          </button>
        </form>
      </div>          
    </div>   
  </>
  )
}
