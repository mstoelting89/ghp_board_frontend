import { state } from '@/store/contact/state';
import { actions } from '@/store/contact/actions';
import { getters } from '@/store/contact/getters'
import { mutations } from '@/store/contact/mutations';

const contactModule = {
    state,
    actions,
    getters,
    mutations
}

export default contactModule;