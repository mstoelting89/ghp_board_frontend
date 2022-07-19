import { state } from '@/store/user/state';
import { actions } from '@/store/user/actions';
import { getters } from '@/store/user/getters'
import { mutations } from '@/store/user/mutations';

const userModule = {
    state,
    actions,
    getters,
    mutations
}

export default userModule;