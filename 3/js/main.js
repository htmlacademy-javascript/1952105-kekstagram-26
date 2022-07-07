import generatePosts from './data.js';
import createThumbnailsFragment from './post-thumbnail.js';

const posts = generatePosts().sort(() => Math.random() - .5);
document.querySelector('.pictures').append(createThumbnailsFragment(posts));
