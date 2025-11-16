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
                        'pearl': score.rank <= 1 , 
                        'diamond': (score.rank >= 2) && (score.rank <= 9) , 
                        'ruby': (score.rank >= 10) && (score.rank <= 26) , 
                        'emerald': (score.rank >= 27) && (score.rank <= 39) , 
                        'jade': (score.rank >= 40) && (score.rank <= 58) , 
                        'sapphire': (score.rank >= 59) && (score.rank <= 78) , 
                        'platinum': (score.rank >= 79) && (score.rank <= 98) , 
                        'amber': (score.rank >= 99) && (score.rank <= 116) , 
                        'gold': (score.rank >= 117) && (score.rank <= 142) , 
                        'silver': (score.rank >= 143) && (score.rank <= 158) , 
                        'bronze': (score.rank >= 159) && (score.rank <= 183) , 
                        'beginner': (score.rank >= 184) && (score.rank <= 197) , 
                        'wood': (score.rank >= 198)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': score.rank <= 1 , 
                        'diamond': (score.rank >= 2) && (score.rank <= 9) , 
                        'ruby': (score.rank >= 10) && (score.rank <= 26) , 
                        'emerald': (score.rank >= 27) && (score.rank <= 39) , 
                        'jade': (score.rank >= 40) && (score.rank <= 58) , 
                        'sapphire': (score.rank >= 59) && (score.rank <= 78) , 
                        'platinum': (score.rank >= 79) && (score.rank <= 98) , 
                        'amber': (score.rank >= 99) && (score.rank <= 116) , 
                        'gold': (score.rank >= 117) && (score.rank <= 142) , 
                        'silver': (score.rank >= 143) && (score.rank <= 158) , 
                        'bronze': (score.rank >= 159) && (score.rank <= 183) , 
                        'beginner': (score.rank >= 184) && (score.rank <= 197) , 
                        'wood': (score.rank >= 198)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'pearl': score.rank <= 1 , 
                        'diamond': (score.rank >= 2) && (score.rank <= 9) , 
                        'ruby': (score.rank >= 10) && (score.rank <= 26) , 
                        'emerald': (score.rank >= 27) && (score.rank <= 39) , 
                        'jade': (score.rank >= 40) && (score.rank <= 58) , 
                        'sapphire': (score.rank >= 59) && (score.rank <= 78) , 
                        'platinum': (score.rank >= 79) && (score.rank <= 98) , 
                        'amber': (score.rank >= 99) && (score.rank <= 116) , 
                        'gold': (score.rank >= 117) && (score.rank <= 142) , 
                        'silver': (score.rank >= 143) && (score.rank <= 158) , 
                        'bronze': (score.rank >= 159) && (score.rank <= 183) , 
                        'beginner': (score.rank >= 184) && (score.rank <= 197) , 
                        'wood': (score.rank >= 198)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
