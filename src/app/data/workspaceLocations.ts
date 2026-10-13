// The HiLink addresses shown as locations across the site: every location
// except The Quarter Club (204 Tran Quang Khai), which is a private club and
// appears on the Business Club page instead.
import { LOCATIONS } from './locations';

export const WORKSPACE_LOCATIONS = LOCATIONS.filter((l) => l.id !== 'club-tqk');
