Always prefer gap instead of margin or padding to space elements in a grid or flexbox layout
When updating `src/data/people.json`, set `submitted_at` only if it is currently `null`, preserve it on later profile enrichments unless the user explicitly corrects the first-send time, and rely on the `4/2/1` weighted ranking rule (`image=4`, `job_title=2`, `institution=1`) so the `Disertantes` list is always recalculated consistently.
MUST commit only changes associated with the current context, not unrelated changes
MUST use TailwindCSS standard classes instead of custom ones. Like h-6 instead of h-[24rem]. If no TailwindCSS standard class matches the custom one try to rearrange the layout to accommodate for the difference, or it not important fallback to the closes standard class
