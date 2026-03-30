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
                        'pearl': score.rank <= 3 , 
                        'diamond': (score.rank >= 4) && (score.rank <= 15) , 
                        'ruby': (score.rank >= 16) && (score.rank <= 33) , 
                        'emerald': (score.rank >= 34) && (score.rank <= 56) , 
                        'jade': (score.rank >= 57) && (score.rank <= 84) , 
                        'osmium': (score.rank >= 85) && (score.rank <= 95) ,
                        'sapphire': (score.rank >= 96) && (score.rank <= 117) , 
                        'titanium': (score.rank >= 118) && (score.rank <= 131) ,
                        'platinum': (score.rank >= 132) && (score.rank <= 148) , 
                        'amber': (score.rank >= 149) && (score.rank <= 174) , 
                        'gold': (score.rank >= 175) && (score.rank <= 197) , 
                        'silver': (score.rank >= 198) && (score.rank <= 213) , 
                        'bronze': (score.rank >= 214) && (score.rank <= 238) , 
                        'beginner': (score.rank >= 239) && (score.rank <= 252) , 
                        'wood': (score.rank >= 253)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': score.rank <= 3 , 
                        'diamond': (score.rank >= 4) && (score.rank <= 15) , 
                        'ruby': (score.rank >= 16) && (score.rank <= 33) , 
                        'emerald': (score.rank >= 34) && (score.rank <= 56) , 
                        'jade': (score.rank >= 57) && (score.rank <= 84) , 
                        'osmium': (score.rank >= 85) && (score.rank <= 95) ,
                        'sapphire': (score.rank >= 96) && (score.rank <= 117) , 
                        'titanium': (score.rank >= 118) && (score.rank <= 131) ,
                        'platinum': (score.rank >= 132) && (score.rank <= 148) , 
                        'amber': (score.rank >= 149) && (score.rank <= 174) , 
                        'gold': (score.rank >= 175) && (score.rank <= 197) , 
                        'silver': (score.rank >= 198) && (score.rank <= 213) , 
                        'bronze': (score.rank >= 214) && (score.rank <= 238) , 
                        'beginner': (score.rank >= 239) && (score.rank <= 252) , 
                        'wood': (score.rank >= 253)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': score.rank <= 3 , 
                        'diamond': (score.rank >= 4) && (score.rank <= 15) , 
                        'ruby': (score.rank >= 16) && (score.rank <= 33) , 
                        'emerald': (score.rank >= 34) && (score.rank <= 56) , 
                        'jade': (score.rank >= 57) && (score.rank <= 84) , 
                        'osmium': (score.rank >= 85) && (score.rank <= 95) ,
                        'sapphire': (score.rank >= 96) && (score.rank <= 117) , 
                        'titanium': (score.rank >= 118) && (score.rank <= 131) ,
                        'platinum': (score.rank >= 132) && (score.rank <= 148) , 
                        'amber': (score.rank >= 149) && (score.rank <= 174) , 
                        'gold': (score.rank >= 175) && (score.rank <= 197) , 
                        'silver': (score.rank >= 198) && (score.rank <= 213) , 
                        'bronze': (score.rank >= 214) && (score.rank <= 238) , 
                        'beginner': (score.rank >= 239) && (score.rank <= 252) , 
                        'wood': (score.rank >= 253)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
