import List from './pages/List.js';
import Challenges from './pages/challenges.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';

export default [
    { path: '/', component: List },
    { path: '/challenges', component: Challenges },
    { path: '/leaderboard', component: Leaderboard },
    { path: '/roulette', component: Roulette },
];
