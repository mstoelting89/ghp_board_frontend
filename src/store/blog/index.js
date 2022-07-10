import { state } from '@/store/blog/state';
import { actions } from '@/store/blog/actions';
import { getters } from '@/store/blog/getters'
import { mutations } from '@/store/blog/mutations';

const blogModule = {
    state,
    actions,
    getters,
    mutations
}

export default blogModule;