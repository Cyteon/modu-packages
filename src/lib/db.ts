import Dexie, { type EntityTable } from "dexie";

export interface User { // just storing some info from github
    id: number;
    username: string;
    cachedAt: number;
}

export const cache = new Dexie("cache") as Dexie & {
    users: EntityTable<User, 'id'>;
}

cache.version(1).stores({
  users: "id,username,cachedAt"
});

export async function getUser(id: number) {
    let user = await cache.users.get(id);

    if (!user || Date.now() - user.cachedAt > 1000 * 60 * 60 * 24) {
        let data = await fetch(`https://api.github.com/user/${id}`).then(res => res.json());
        cache.users.add({ id, username: data.login || "(not found)", cachedAt: Date.now() });

        return user;
    }

    return user;
}