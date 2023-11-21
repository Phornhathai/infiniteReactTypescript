import './sampledata.scss';
import 'bootstrap/dist/css/bootstrap.css';

type SampleDataCardProps = {
  description: string;
  url: string;
  types: string[];
  topics: string[];
  levels: string[];
};

const SampleDataCard = (props: SampleDataCardProps) => {
  
  return (
    <div className='card'>
      <div className="card-body">
        <h6 className='card-title fw-bold'>{props.description}</h6>
        <p className='card-text'>URL: {props.url}</p>
        <p className='card-text'>Type: {props.types}</p>
        <p className='card-text'>Topics: {props.topics}</p>
        <p className='card-text'>Levels: {props.levels}</p>
      </div>
    </div>
  );
};

export default SampleDataCard;
