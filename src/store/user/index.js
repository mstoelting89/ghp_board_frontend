import { state } from '@/store/user/state';
import { actions } from '@/store/user/actions';
import { getter } from '@/store/user/getter'
import { mutations } from '@/store/user/mutations';

const userModule = {
    state,
    actions,
    getter,
    mutations
}

export default userModule;