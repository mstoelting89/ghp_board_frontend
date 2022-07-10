import { state } from '@/store/instruments/state';
import { actions } from '@/store/instruments/actions';
import { getters } from '@/store/instruments/getters'
import { mutations } from '@/store/instruments/mutations';

const instrumentsModule = {
    state,
    actions,
    getters,
    mutations
}

export default instrumentsModule;