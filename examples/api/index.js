import ajax from '../utils/ajax';

export const getFcwgfList = () => ajax.$get('fcwui');
export const operatingDetails = (id) => ajax.$get('/comcontent/' + id);