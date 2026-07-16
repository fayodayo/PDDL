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
                        'pearl': (score.rank >= 2) && (score.rank <= 7) , 
                        'diamond': (score.rank >= 8) && (score.rank <= 20) , 
                        'ruby': (score.rank >= 21) && (score.rank <= 46) , 
                        'emerald': (score.rank >= 47) && (score.rank <= 73) , 
                        'jade': (score.rank >= 74) && (score.rank <= 93) , 
                        'malachite': (score.rank >= 94) && (score.rank <= 106) , 
                        'osmium': (score.rank >= 107) && (score.rank <= 121) ,
                        'sapphire': (score.rank >= 122) && (score.rank <= 148) , 
                        'titanium': (score.rank >= 149) && (score.rank <= 161) ,
                        'platinum': (score.rank >= 162) && (score.rank <= 183) , 
                        'amber': (score.rank >= 184) && (score.rank <= 213) , 
                        'gold': (score.rank >= 214) && (score.rank <= 238) , 
                        'silver': (score.rank >= 239) && (score.rank <= 256) , 
                        'bronze': (score.rank >= 257) && (score.rank <= 284) , 
                        'beginner': (score.rank >= 285) && (score.rank <= 307) , 
                        'wood': (score.rank >= 308)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': (score.rank >= 2) && (score.rank <= 7) , 
                        'diamond': (score.rank >= 8) && (score.rank <= 20) , 
                        'ruby': (score.rank >= 21) && (score.rank <= 46) , 
                        'emerald': (score.rank >= 47) && (score.rank <= 73) , 
                        'jade': (score.rank >= 74) && (score.rank <= 93) , 
                        'malachite': (score.rank >= 94) && (score.rank <= 106) , 
                        'osmium': (score.rank >= 107) && (score.rank <= 121) ,
                        'sapphire': (score.rank >= 122) && (score.rank <= 148) , 
                        'titanium': (score.rank >= 149) && (score.rank <= 161) ,
                        'platinum': (score.rank >= 162) && (score.rank <= 183) , 
                        'amber': (score.rank >= 184) && (score.rank <= 213) , 
                        'gold': (score.rank >= 214) && (score.rank <= 238) , 
                        'silver': (score.rank >= 239) && (score.rank <= 256) , 
                        'bronze': (score.rank >= 257) && (score.rank <= 284) , 
                        'beginner': (score.rank >= 285) && (score.rank <= 307) , 
                        'wood': (score.rank >= 308)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': (score.rank >= 2) && (score.rank <= 7) , 
                        'diamond': (score.rank >= 8) && (score.rank <= 20) , 
                        'ruby': (score.rank >= 21) && (score.rank <= 46) , 
                        'emerald': (score.rank >= 47) && (score.rank <= 73) , 
                        'jade': (score.rank >= 74) && (score.rank <= 93) , 
                        'malachite': (score.rank >= 94) && (score.rank <= 106) , 
                        'osmium': (score.rank >= 107) && (score.rank <= 121) ,
                        'sapphire': (score.rank >= 122) && (score.rank <= 148) , 
                        'titanium': (score.rank >= 149) && (score.rank <= 161) ,
                        'platinum': (score.rank >= 162) && (score.rank <= 183) , 
                        'amber': (score.rank >= 184) && (score.rank <= 213) , 
                        'gold': (score.rank >= 214) && (score.rank <= 238) , 
                        'silver': (score.rank >= 239) && (score.rank <= 256) , 
                        'bronze': (score.rank >= 257) && (score.rank <= 284) , 
                        'beginner': (score.rank >= 285) && (score.rank <= 307) , 
                        'wood': (score.rank >= 308)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
