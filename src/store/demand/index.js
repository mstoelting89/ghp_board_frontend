import { state } from '@/store/demand/state';
import { actions } from '@/store/demand/actions';
import { getters } from '@/store/demand/getters'
import { mutations } from '@/store/demand/mutations';

const demandModule = {
    state,
    actions,
    getters,
    mutations
}

export default demandModule;