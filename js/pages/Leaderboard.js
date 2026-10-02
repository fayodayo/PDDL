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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 9) , 
                        'diamond': (score.rank >= 10) && (score.rank <= 28) , 
                        'ruby': (score.rank >= 29) && (score.rank <= 64) , 
                        'emerald': (score.rank >= 65) && (score.rank <= 104) , 
                        'jade': (score.rank >= 105) && (score.rank <= 131) , 
                        'osmium': (score.rank >= 132) && (score.rank <= 164) ,
                        'sapphire': (score.rank >= 165) && (score.rank <= 183) , 
                        'titanium': (score.rank >= 184) && (score.rank <= 208) ,
                        'platinum': (score.rank >= 209) && (score.rank <= 232) , 
                        'amber': (score.rank >= 233) && (score.rank <= 269) , 
                        'gold': (score.rank >= 270) && (score.rank <= 304) , 
                        'silver': (score.rank >= 305) && (score.rank <= 333) , 
                        'bronze': (score.rank >= 334) && (score.rank <= 363) , 
                        'beginner': (score.rank >= 364) && (score.rank <= 398) , 
                        'wood': (score.rank >= 399)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 9) , 
                        'diamond': (score.rank >= 10) && (score.rank <= 28) , 
                        'ruby': (score.rank >= 29) && (score.rank <= 64) , 
                        'emerald': (score.rank >= 65) && (score.rank <= 104) , 
                        'jade': (score.rank >= 105) && (score.rank <= 131) , 
                        'osmium': (score.rank >= 132) && (score.rank <= 164) ,
                        'sapphire': (score.rank >= 165) && (score.rank <= 183) , 
                        'titanium': (score.rank >= 184) && (score.rank <= 208) ,
                        'platinum': (score.rank >= 209) && (score.rank <= 232) , 
                        'amber': (score.rank >= 233) && (score.rank <= 269) , 
                        'gold': (score.rank >= 270) && (score.rank <= 304) , 
                        'silver': (score.rank >= 305) && (score.rank <= 333) , 
                        'bronze': (score.rank >= 334) && (score.rank <= 363) , 
                        'beginner': (score.rank >= 364) && (score.rank <= 398) , 
                        'wood': (score.rank >= 399)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'amethyst': score.rank <= 2 , 
                        'pearl': (score.rank >= 3) && (score.rank <= 9) , 
                        'diamond': (score.rank >= 10) && (score.rank <= 28) , 
                        'ruby': (score.rank >= 29) && (score.rank <= 64) , 
                        'emerald': (score.rank >= 65) && (score.rank <= 104) , 
                        'jade': (score.rank >= 105) && (score.rank <= 131) , 
                        'osmium': (score.rank >= 132) && (score.rank <= 164) ,
                        'sapphire': (score.rank >= 165) && (score.rank <= 183) , 
                        'titanium': (score.rank >= 184) && (score.rank <= 208) ,
                        'platinum': (score.rank >= 209) && (score.rank <= 232) , 
                        'amber': (score.rank >= 233) && (score.rank <= 269) , 
                        'gold': (score.rank >= 270) && (score.rank <= 304) , 
                        'silver': (score.rank >= 305) && (score.rank <= 333) , 
                        'bronze': (score.rank >= 334) && (score.rank <= 363) , 
                        'beginner': (score.rank >= 364) && (score.rank <= 398) , 
                        'wood': (score.rank >= 399)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
