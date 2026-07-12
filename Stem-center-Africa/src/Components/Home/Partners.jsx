import '../../Styles/Partners.css'
import snapsImage from '../../assets/Snaps logo.avif'
import MoringaImage from '../../assets/moringaschool.jpg'
import GenderImage from '../../assets/Genderscan.png'
import awsImage from '../../assets/aws.png'
import montImage from '../../assets/mont.png'

function Partners(){

const partners = [
  {
    id: 1,
    image: snapsImage,
    alt: 'Snaps Logo',
    link: 'https://www.edsnaps.org/',
    name: 'Snaps',
  },
  {
    id: 2,
    image: MoringaImage,
    alt: 'Moringa School',
    link: 'https://moringaschool.com',
    name: 'Moringa School',
  },
  {
    id: 3,
    image: GenderImage,
    alt: 'GenderScan',
    link: 'https://www.genderscan.org/',
    name: 'GenderScan',
  },
  {
    id: 4,
    image: awsImage,
    alt: 'AWS',
    link: 'https://aws.amazon.com',
    name: 'AWS',
  },
  {
    id: 5,
    image: montImage,
    alt: 'Mont',
    link: '#',
    name: 'Mont',
  },
];    


return(

    <>
    
  <section className="partners-section">

         <p className="partners-heading">Our Partners</p>
       
    <div className="partners-container">

         
      {partners.map((p) => (
        <a
          key={p.id}
          href={p.link}
          className="partner-card"
          target="_blank"
          rel="noopener noreferrer"
          title={p.name}
        >
          <img src={p.image} alt={p.alt} className="partner-logo" />
        </a>
      ))}
    </div>
  </section>
    
    
    
    
    </>
)




}

export default Partners;