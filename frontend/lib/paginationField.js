import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginatinField() {
  return {
    keyArgs: false, // tells apollo, we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // If there are items and there arent enough items to satisfy how many we requested and we are on the last page, then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We Dont have any items. We must go to network to fetch them
        return false;
      }

      // If there are items, just return them from the cache, and we dont need to go to the network
      if (items.length) {
        console.log(
          `There are ${items} items in the cache! gonna send them to apollo `
        );
        return items;
      }

      return false; // Fallback to network
      // First thing it does is, ask for the read function ofr those items

      // We can do either one of two things:
      // 1. return the items because they are already in the cache
      // 2. return a flase from here(will make a request to keystone)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the apollo client comes back form the network with our product
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // Finally we return the merged items from the cache
      return merged;
    },
  };
}
