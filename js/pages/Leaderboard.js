import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <td class="rank">
                                <p class="type-label-lg">#{{ i + 1 }}</p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg">{{ localize(ientry.total) }}</p>
                            </td>
                            <td class="user" :class="{ 'active': selected == i }">
                                <button @click="selected = i">
                                    <span class="type-label-lg">{{ ientry.user }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="player-container">
                    <div class="player">
                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 1 , 
                        'pearl': (score.rank >= 2) && (score.rank <= 5) , 
                        'diamond': (score.rank >= 6) && (score.rank <= 19) , 
                        'ruby': (score.rank >= 20) && (score.rank <= 44) , 
                        'emerald': (score.rank >= 45) && (score.rank <= 69) , 
                        'jade': (score.rank >= 70) && (score.rank <= 90) , 
                        'malachite': (score.rank >= 91) && (score.rank <= 103) , 
                        'osmium': (score.rank >= 104) && (score.rank <= 116) ,
                        'sapphire': (score.rank >= 117) && (score.rank <= 144) , 
                        'titanium': (score.rank >= 145) && (score.rank <= 157) ,
                        'platinum': (score.rank >= 158) && (score.rank <= 179) , 
                        'amber': (score.rank >= 180) && (score.rank <= 209) , 
                        'gold': (score.rank >= 210) && (score.rank <= 234) , 
                        'silver': (score.rank >= 235) && (score.rank <= 251) , 
                        'bronze': (score.rank >= 252) && (score.rank <= 278) , 
                        'beginner': (score.rank >= 279) && (score.rank <= 300) , 
                        'wood': (score.rank >= 301)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 1 , 
                        'pearl': (score.rank >= 2) && (score.rank <= 5) , 
                        'diamond': (score.rank >= 6) && (score.rank <= 19) , 
                        'ruby': (score.rank >= 20) && (score.rank <= 44) , 
                        'emerald': (score.rank >= 45) && (score.rank <= 69) , 
                        'jade': (score.rank >= 70) && (score.rank <= 90) , 
                        'malachite': (score.rank >= 91) && (score.rank <= 103) , 
                        'osmium': (score.rank >= 104) && (score.rank <= 116) ,
                        'sapphire': (score.rank >= 117) && (score.rank <= 144) , 
                        'titanium': (score.rank >= 145) && (score.rank <= 157) ,
                        'platinum': (score.rank >= 158) && (score.rank <= 179) , 
                        'amber': (score.rank >= 180) && (score.rank <= 209) , 
                        'gold': (score.rank >= 210) && (score.rank <= 234) , 
                        'silver': (score.rank >= 235) && (score.rank <= 251) , 
                        'bronze': (score.rank >= 252) && (score.rank <= 278) , 
                        'beginner': (score.rank >= 279) && (score.rank <= 300) , 
                        'wood': (score.rank >= 301)}"  target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{entry.progressed.length}})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p>#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" class="level" :class="{ 
                        'amethyst': score.rank <= 1 , 
                        'pearl': (score.rank >= 2) && (score.rank <= 5) , 
                        'diamond': (score.rank >= 6) && (score.rank <= 19) , 
                        'ruby': (score.rank >= 20) && (score.rank <= 44) , 
                        'emerald': (score.rank >= 45) && (score.rank <= 69) , 
                        'jade': (score.rank >= 70) && (score.rank <= 90) , 
                        'malachite': (score.rank >= 91) && (score.rank <= 103) , 
                        'osmium': (score.rank >= 104) && (score.rank <= 116) ,
                        'sapphire': (score.rank >= 117) && (score.rank <= 144) , 
                        'titanium': (score.rank >= 145) && (score.rank <= 157) ,
                        'platinum': (score.rank >= 158) && (score.rank <= 179) , 
                        'amber': (score.rank >= 180) && (score.rank <= 209) , 
                        'gold': (score.rank >= 210) && (score.rank <= 234) , 
                        'silver': (score.rank >= 235) && (score.rank <= 251) , 
                        'bronze': (score.rank >= 252) && (score.rank <= 278) , 
                        'beginner': (score.rank >= 279) && (score.rank <= 300) , 
                        'wood': (score.rank >= 301)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        // Hide loading spinner
        this.loading = false;
    },
    methods: {
        localize,
    },
};
