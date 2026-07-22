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
                        'ruby': (score.rank >= 21) && (score.rank <= 47) , 
                        'emerald': (score.rank >= 48) && (score.rank <= 75) , 
                        'jade': (score.rank >= 76) && (score.rank <= 95) , 
                        'malachite': (score.rank >= 96) && (score.rank <= 108) , 
                        'osmium': (score.rank >= 109) && (score.rank <= 122) ,
                        'sapphire': (score.rank >= 123) && (score.rank <= 150) , 
                        'titanium': (score.rank >= 151) && (score.rank <= 163) ,
                        'platinum': (score.rank >= 164) && (score.rank <= 185) , 
                        'amber': (score.rank >= 186) && (score.rank <= 216) , 
                        'gold': (score.rank >= 217) && (score.rank <= 244) , 
                        'silver': (score.rank >= 245) && (score.rank <= 263) , 
                        'bronze': (score.rank >= 264) && (score.rank <= 293) , 
                        'beginner': (score.rank >= 294) && (score.rank <= 317) , 
                        'wood': (score.rank >= 318)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'ruby': (score.rank >= 21) && (score.rank <= 47) , 
                        'emerald': (score.rank >= 48) && (score.rank <= 75) , 
                        'jade': (score.rank >= 76) && (score.rank <= 95) , 
                        'malachite': (score.rank >= 96) && (score.rank <= 108) , 
                        'osmium': (score.rank >= 109) && (score.rank <= 122) ,
                        'sapphire': (score.rank >= 123) && (score.rank <= 150) , 
                        'titanium': (score.rank >= 151) && (score.rank <= 163) ,
                        'platinum': (score.rank >= 164) && (score.rank <= 185) , 
                        'amber': (score.rank >= 186) && (score.rank <= 216) , 
                        'gold': (score.rank >= 217) && (score.rank <= 244) , 
                        'silver': (score.rank >= 245) && (score.rank <= 263) , 
                        'bronze': (score.rank >= 264) && (score.rank <= 293) , 
                        'beginner': (score.rank >= 294) && (score.rank <= 317) , 
                        'wood': (score.rank >= 318)}"  target="_blank" :href="score.link">{{ score.level }}</a>
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
                        'ruby': (score.rank >= 21) && (score.rank <= 47) , 
                        'emerald': (score.rank >= 48) && (score.rank <= 75) , 
                        'jade': (score.rank >= 76) && (score.rank <= 95) , 
                        'malachite': (score.rank >= 96) && (score.rank <= 108) , 
                        'osmium': (score.rank >= 109) && (score.rank <= 122) ,
                        'sapphire': (score.rank >= 123) && (score.rank <= 150) , 
                        'titanium': (score.rank >= 151) && (score.rank <= 163) ,
                        'platinum': (score.rank >= 164) && (score.rank <= 185) , 
                        'amber': (score.rank >= 186) && (score.rank <= 216) , 
                        'gold': (score.rank >= 217) && (score.rank <= 245) , 
                        'silver': (score.rank >= 246) && (score.rank <= 264) , 
                        'bronze': (score.rank >= 265) && (score.rank <= 294) , 
                        'beginner': (score.rank >= 295) && (score.rank <= 317) , 
                        'wood': (score.rank >= 318)}" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
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
