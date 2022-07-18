import './upload.js';
import {getPosts} from './api.js';
import initGallery from './gallery.js';
import showMessage from './message.js';

getPosts().then(initGallery).catch((exception) => {
  showMessage('error', `Ошибка: ${exception.status || exception.message}`);
});

