import PropTypes from 'prop-types';
import HomeContainerCard from './home-container-card';

const HomeCardProduct = ({ productCa }) => <HomeContainerCard productCa={productCa} />;

export default HomeCardProduct;

HomeCardProduct.propTypes = {
  productCa: PropTypes.string,
};
