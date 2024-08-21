import { appBusinessInfo } from "../utilities/interfaces";

interface BusinessProps {
  info: appBusinessInfo;
}

const Business: React.FC<BusinessProps> = ({ info }) => {
  return (
    <div className='restaurant-card'>
      <a href={info.url} target="_blank" rel="noreferrer">
        <img className='image' src={info.img} alt={info.name} />
      </a>
      <div className='info'>
        <p className='name'>{info.name}</p>
        <p className='address'>{info.address}</p>
        <p className='category'>{info.category}</p>
        <p className='rating'>{info.rating} stars</p>
        <p className='reviews'>{info.reviews} reviews</p>
      </div>
    </div>
  );
};

export default Business;