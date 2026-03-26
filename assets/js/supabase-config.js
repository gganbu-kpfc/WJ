const SUPABASE_URL = "https://pxyykaduivfnfuhlpjai.supabase.co";
const SUPABASE_KEY = "sb_publishable_TX186xuxH90gDZV22bQq8w_7XcubEqw";

window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("SUPABASE_URL:", SUPABASE_URL);
console.log("SUPABASE_KEY:", SUPABASE_KEY);
