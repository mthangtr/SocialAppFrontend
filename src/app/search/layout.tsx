import { Grid } from "@mui/material";
function SearchPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mt-14">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    {children}
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        </main >
    );
}

export default SearchPageLayout;
