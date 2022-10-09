using AppDiagnose.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualBasic;
using System.Collections.Generic;

namespace AppDiagnose.DAL
{
    public static class DBinit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                // KATEGORIER

                //K1
                var psykisk = new Kategori
                {
                    navn = "Psykisk",
                };
                context.kategorier.Add(psykisk);

                //K2
                var revmatisk = new Kategori
                {
                    navn = "Revmatisk"
                };
                context.kategorier.Add(revmatisk);

                //K3
                var nevrologisk = new Kategori
                {
                    navn = "Nevrologisk"
                };
                context.kategorier.Add(nevrologisk);

                //K4
                var ore_nese_hals = new Kategori
                {
                    navn = "Øre, Nese og Hals"
                };
                context.kategorier.Add(ore_nese_hals);


                // SYMPTOMER - KATEGORI 1 (PSYKISK)

                //K1-S1
                var konsentrasjonsvansker = new Symptom
                {
                    navn = "Konsentrasjonsvansker",
                    kategori = psykisk
                };
                context.Symptomer.Add(konsentrasjonsvansker);

                //K1-S1
                var hyperaktivitet = new Symptom
                {
                    navn = "Hyperaktivitet",
                    kategori = psykisk
                };
                context.Symptomer.Add(hyperaktivitet);

                //K1-S3
                var impulsivitet = new Symptom
                {
                    navn = "Impulsivitet",
                    kategori = psykisk
                };
                context.Symptomer.Add(impulsivitet);

                //K1-S4
                var melankoli = new Symptom
                {
                    navn = "Melankoli",
                    kategori = psykisk
                };
                context.Symptomer.Add(melankoli);

                //K1-S5
                var humorsvingninger = new Symptom
                {
                    navn = "Humørsvingninger",
                    kategori = psykisk
                };
                context.Symptomer.Add(humorsvingninger);

                //K1-S6
                var mani = new Symptom
                {
                    navn = "Mani",
                    kategori = psykisk
                };
                context.Symptomer.Add(mani);

                //K1-S7
                var nedsatt_apetitt = new Symptom
                {
                    navn = "Nedsatt apetitt",
                    kategori = psykisk
                };
                context.Symptomer.Add(nedsatt_apetitt);

                // SYMPTOMER - KATEGORI 2 (REVMATISK)

                //K2-S1
                var muskelsmerter = new Symptom
                {
                    navn = "Muskelsmerter",
                    kategori = revmatisk
                };
                context.Symptomer.Add(muskelsmerter);

                //K2-S2
                var leddsmerter = new Symptom
                {
                    navn = "Leddsmerter",
                    kategori = revmatisk
                };
                context.Symptomer.Add(leddsmerter);

                //K2-S3
                var ryggsmerter = new Symptom
                {
                    navn = "Ryggsmerter",
                    kategori = revmatisk
                };
                context.Symptomer.Add(ryggsmerter);

                //K2-S4
                var isjiassmerte = new Symptom
                {
                    navn = "Isjiassmerte",
                    kategori = revmatisk
                };
                context.Symptomer.Add(isjiassmerte);

                // SYMPTOMER - KATEGORI 3 (NEVROLOGISK)

                //K3-S1
                var hukommelsestap = new Symptom
                {
                    navn = "Hukommelsestap",
                    kategori = nevrologisk
                };
                context.Symptomer.Add(hukommelsestap);

                //K3-S2
                var hodepine = new Symptom
                {
                    navn = "Hodepine",
                    kategori = nevrologisk
                };
                context.Symptomer.Add(hodepine);

                //K3-S3
                var hallusinasjoner = new Symptom
                {
                    navn = "Hallusinasjoner",
                    kategori = nevrologisk
                };
                context.Symptomer.Add(hallusinasjoner);

                //K3-S4
                var lammelse = new Symptom
                {
                    navn = "Lammelse",
                    kategori = nevrologisk
                };
                context.Symptomer.Add(lammelse);

                //K3-S5
                var sovnighet = new Symptom
                {
                    navn = "Søvnighet",
                    kategori = nevrologisk
                };
                context.Symptomer.Add(sovnighet);

                // SYMPTOMER - KATEGORI 4 (ØRE, NESE OG HALS)

                //K4-S1
                var oresus = new Symptom
                {
                    navn = "Øresus",
                    kategori = ore_nese_hals
                };
                context.Symptomer.Add(oresus);

                //K4-S2
                var rennende_nese = new Symptom
                {
                    navn = "Rennende nese",
                    kategori = ore_nese_hals
                };
                context.Symptomer.Add(rennende_nese);

                //K4-S3
                var saar_hals = new Symptom
                {
                    navn = "Sår hals",
                    kategori = ore_nese_hals
                };
                context.Symptomer.Add(saar_hals);

                //K4-S4
                var hoste = new Symptom
                {
                    navn = "Hoste",
                    kategori = ore_nese_hals
                };
                context.Symptomer.Add(hoste);

                //K4-S5
                var daarlig_aande = new Symptom
                {
                    navn = "Dårlig ånde",
                    kategori = ore_nese_hals
                };
                context.Symptomer.Add(daarlig_aande);


                // DIAGNOSER OG TILHØRENDE SYMPTOMER

                //D1 - DIAGNOSE
                var ADHD = new Diagnose
                {
                    navn = "ADHD",
                    info = "Hyperkinetisk forstyrrelsen karakterisert ved manglende utholdenhet i aktiviteter som krever kognitivt engasjement " +
                    "og en tendens til å skifte fra én aktivitet til en annen uten å gjøre noe ferdig, " +
                    "kombinert med en form for uorganisert, dårlig regulert og overdreven aktivitet",
                    link = "https://sml.snl.no/ADHD"
                };

                //D1 - SYMPTOMER
                //D1-S1
                var d1s1 = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = ADHD
                };
                //D1-S2
                var d1s2 = new SymptomForDiagnose
                {
                    symptom = hyperaktivitet,
                    diagnose = ADHD
                };
                //D1-S3
                var d1s3 = new SymptomForDiagnose
                {
                    symptom = impulsivitet,
                    diagnose = ADHD
                };
                //Lagrer i databasen
                context.Diagnoser.Add(ADHD);
                context.SymptomForDiagnose.Add(d1s1);
                context.SymptomForDiagnose.Add(d1s2);
                context.SymptomForDiagnose.Add(d1s3);


                //D2 - DIAGNOSE
                var bipolar = new Diagnose
                {
                    navn = "Bipolar lidelse",
                    info = "Bipolar lidelse er en moderne betegnelse for manisk-depressiv psykose og ikke-psykotiske psykiske lidelser" +
                    " som nevrobiologisk og klinisk er beslektet med manisk-depressiv psykose. " +
                    "Tilstanden debuterer vanligvis i ungdomsårene med periodevise adferdsforstyrrelser og endret stemningsleie.",
                    link = "https://sml.snl.no/bipolar_lidelse"
                };

                //D2 - SYMPTOMER
                //D2-S1
                var d2s1 = new SymptomForDiagnose
                {
                    symptom = melankoli,
                    diagnose = bipolar
                };
                //D2-S2
                var d2s2 = new SymptomForDiagnose
                {
                    symptom = humorsvingninger,
                    diagnose = bipolar
                };
                //D2-S3
                var d2s3 = new SymptomForDiagnose
                {
                    symptom = impulsivitet,
                    diagnose = bipolar
                };
                //D2-S4
                var d2s4 = new SymptomForDiagnose
                {
                    symptom = mani,
                    diagnose = bipolar
                };
                //Lagrer i databasen
                context.Diagnoser.Add(bipolar);
                context.SymptomForDiagnose.Add(d2s1);
                context.SymptomForDiagnose.Add(d2s2);
                context.SymptomForDiagnose.Add(d2s3);
                context.SymptomForDiagnose.Add(d2s4);


                //D3 - DIAGNOSE
                var influensa = new Diagnose
                {
                    navn = "Influensa",
                    info = "Influensa er en infeksjonssykdom som først og fremst rammer luftveiene. " +
                    "Sykdommen forårsakes av influensavirus. Et typisk tilfelle starter med feber, hodepine, muskelsmerter og luftveissymptomer. " +
                    "Sykdommen varer 5–7 dager og er svært smittsom.",
                    link = "https://sml.snl.no/influensa"
                };

                //D3 - SYMPTOMER
                //D3-S1
                var d3s1 = new SymptomForDiagnose
                {
                    symptom = muskelsmerter,
                    diagnose = influensa
                };
                //D3-S2
                var d3s2 = new SymptomForDiagnose
                {
                    symptom = hodepine,
                    diagnose = influensa
                };
                //D3-S3
                var d3s3 = new SymptomForDiagnose
                {
                    symptom = hoste,
                    diagnose = influensa
                };
                //D3-S4
                var d3s4 = new SymptomForDiagnose
                {
                    symptom = rennende_nese,
                    diagnose = influensa
                };
                //D3-S5
                var d3s5 = new SymptomForDiagnose
                {
                    symptom = saar_hals,
                    diagnose = influensa
                };
                //Lagrer i databasen
                context.Diagnoser.Add(influensa);
                context.SymptomForDiagnose.Add(d3s1);
                context.SymptomForDiagnose.Add(d3s2);
                context.SymptomForDiagnose.Add(d3s3);
                context.SymptomForDiagnose.Add(d3s4);
                context.SymptomForDiagnose.Add(d3s5);


                //D4 - DIAGNOSE
                var depresjon = new Diagnose
                {
                    navn = "Depresjon",
                    info = "Depresjon betegner i dagligtale nedtrykthet over noen tid. " +
                    "I psykiatrien betegner depresjon en psykisk lidelse som er kjennetegnet av de karakteristiske symptomene: " +
                    "nedtrykthet, tristhet, tomhetsfølelse og redusert initiativ og interesse for andre og tidligere gledesfylte aktiviteter",
                    link = "https://sml.snl.no/depresjon"
                };

                //D4 - SYMPTOMER
                //D4-S1
                var d4s1 = new SymptomForDiagnose
                {
                    symptom = melankoli,
                    diagnose = depresjon
                };
                //D4-S2
                var d4s2 = new SymptomForDiagnose
                {
                    symptom = sovnighet,
                    diagnose = depresjon
                };
                //D4-S3
                var d4s3 = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = depresjon
                };
                //D4-S4
                var d4s4 = new SymptomForDiagnose
                {
                    symptom = nedsatt_apetitt,
                    diagnose = depresjon
                };
                //Lagrer i databasen
                context.Diagnoser.Add(depresjon);
                context.SymptomForDiagnose.Add(d4s1);
                context.SymptomForDiagnose.Add(d4s2);
                context.SymptomForDiagnose.Add(d4s3);
                context.SymptomForDiagnose.Add(d4s4);

                //D5 - DIAGNOSE
                var forkjolelse = new Diagnose
                {
                    navn = "Forkjølelse",
                    info = "Forkjølelse er en virusinfeksjon som gir plager fra luftveiene, ofte tett, rennende nese " +
                    "og noen ganger sår hals, hodepine og slapphet. " +
                    "Symptomene skyldes at infeksjonen skaper betennelsesreaksjoner i slimhinnene i nesen og de øvre luftveier. " +
                    "Så å si alle blir forkjølet en eller annen gang.",
                    link = "https://sml.snl.no/forkj%C3%B8lelse"
                };

                //D5 - SYMPTOMER
                //D5-S1
                var d5s1 = new SymptomForDiagnose
                {
                    symptom = rennende_nese,
                    diagnose = forkjolelse
                };
                //D5-S2
                var d5s2 = new SymptomForDiagnose
                {
                    symptom = saar_hals,
                    diagnose = forkjolelse
                };
                //D5-S3
                var d5s3 = new SymptomForDiagnose
                {
                    symptom = hoste,
                    diagnose = forkjolelse
                };
                //D5-S4
                var d5s4 = new SymptomForDiagnose
                {
                    symptom = hodepine,
                    diagnose = forkjolelse
                };
                //Lagrer i databasen
                context.Diagnoser.Add(forkjolelse);
                context.SymptomForDiagnose.Add(d5s1);
                context.SymptomForDiagnose.Add(d5s2);
                context.SymptomForDiagnose.Add(d5s3);
                context.SymptomForDiagnose.Add(d5s4);


                //D6 - DIAGNOSE
                var leddgikt = new Diagnose
                {
                    navn = "Leddgikt",
                    info = "Leddgikt (revmatoid artritt) er blant de vanligste kroniske revmatiske sykdommene som medfører leddbetennelser (artritt). " +
                    "Leddene kan raskt få varige skader. Den revmatiske betennelsen kan også angripe hud, lunger og andre indre organer. " +
                    "Sykdomsdempende legemidler hindrer imidlertid et alvorlig sykdomsforløp hos de fleste.",
                    link = "https://sml.snl.no/leddgikt"
                };

                //D6 - SYMPTOMER
                //D6-S1
                var d6s1 = new SymptomForDiagnose
                {
                    symptom = leddsmerter,
                    diagnose = leddgikt
                };
                //D6-S2
                var d6s2 = new SymptomForDiagnose
                {
                    symptom = muskelsmerter,
                    diagnose = leddgikt
                };
                //D6-S3
                var d6s3 = new SymptomForDiagnose
                {
                    symptom = ryggsmerter,
                    diagnose = leddgikt
                };
                //D6-S4
                var d6s4 = new SymptomForDiagnose
                {
                    symptom = hodepine,
                    diagnose = leddgikt
                };
                //Lagrer i databasen
                context.Diagnoser.Add(leddgikt);
                context.SymptomForDiagnose.Add(d6s1);
                context.SymptomForDiagnose.Add(d6s2);
                context.SymptomForDiagnose.Add(d6s3);
                context.SymptomForDiagnose.Add(d6s4);


                //D7 - DIAGNOSE
                var halitose = new Diagnose
                {
                    navn = "Halitose",
                    info = "Halitose en tilstand med illeluktende utåndingsluft. I omtrent 90 prosent av tilfellene er årsaken i munnen. " +
                    "Det kan dreie seg om dårlig munnhygiene, karies (hull i tennene) og tannkjøttbetennelse (både akutt gingivitt og kronisk periodontitt). " +
                    "Den vonde lukten skyldes oftest fordampning av svovelforbindelser som resultat av bakteriers proteinnedbrytning.",
                    link = "https://sml.snl.no/d%C3%A5rlig_%C3%A5nde"
                };

                //D7 - SYMPTOMER
                //D7-S1
                var d7s1 = new SymptomForDiagnose
                {
                    symptom = daarlig_aande,
                    diagnose = halitose
                };
                //Lagrer i databasen
                context.Diagnoser.Add(halitose);
                context.SymptomForDiagnose.Add(d7s1);


                //D8 - DIAGNOSE
                var diskusprolaps = new Diagnose
                {
                    navn = "Diskusprolaps",
                    info = "Den aller hyppigste årsaken til isjiassmerte er diskusprolaps, også kalt nukleusprolaps, " +
                    "det vil si et fremfall av mellomvirvelskivens bløte kjerne (nucleus), spesielt i de nedre lendevirvlene (lumbalvirvler), " +
                    "som derved trykker på nerverøttene der hvor de springer ut fra ryggmargen. " +
                    "Nivået for skaden kan påvises ved nevrologiske undersøkelser.",
                    link = "https://sml.snl.no/diskusprolaps"
                };

                //D8 - SYMPTOMER
                //D8-S1
                var d8s1 = new SymptomForDiagnose
                {
                    symptom = isjiassmerte,
                    diagnose = diskusprolaps
                };
                //D8-S2
                var d8s2 = new SymptomForDiagnose
                {
                    symptom = lammelse,
                    diagnose = diskusprolaps
                };
                //Lagrer i databasen
                context.Diagnoser.Add(diskusprolaps);
                context.SymptomForDiagnose.Add(d8s1);
                context.SymptomForDiagnose.Add(d8s2);


                //D9 - DIAGNOSE
                var tinnitus = new Diagnose
                {
                    navn = "Tinnitus",
                    info = "Tinnitus, øresus, er vanligvis karakterisert ved at pasienten oppfatter en lyd " +
                    "uten at det foreligger noen ytre sansepåvirkning. Noen kaller tinnitus også for fantomlyd. " +
                    "Tinnitus er utbredt, spesielt i aldersgruppen 40–70 år. " +
                    "Majoriteten av tinnituspasienter håndterer sitt symptom godt og er lite plaget i dagliglivet.",
                    link = "https://sml.snl.no/tinnitus"
                };

                //D9 - SYMPTOMER
                //D9-S1
                var d9s1 = new SymptomForDiagnose
                {
                    symptom = oresus,
                    diagnose = tinnitus
                };
                //D9-S2
                var d9s2 = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = tinnitus
                };
                //Lagrer i databasen
                context.Diagnoser.Add(tinnitus);
                context.SymptomForDiagnose.Add(d9s1);
                context.SymptomForDiagnose.Add(d9s2);


                //D10 - DIAGNOSE
                var hjernerystelse = new Diagnose
                {
                    navn = "Hjernerystelse",
                    info = "Som navnet sier, utløses tilstanden ved en rystelse av hjernen. " +
                    "Dette kan skje direkte ved et slag mot selve hodeskallen, for eksempel ved at man støter " +
                    "hodet mot noe eller blir slått, for eksempel ved et fall, eller en annen form for skade.",
                    link = "https://sml.snl.no/hjernerystelse"
                };

                //D10 - SYMPTOMER
                //D10-S1
                var d10s1 = new SymptomForDiagnose
                {
                    symptom = hukommelsestap,
                    diagnose = hjernerystelse
                };
                //D10-S2
                var d10s2 = new SymptomForDiagnose
                {
                    symptom = sovnighet,
                    diagnose = hjernerystelse
                };
                //D10-S3
                var d10s3 = new SymptomForDiagnose
                {
                    symptom = konsentrasjonsvansker,
                    diagnose = hjernerystelse
                };
                //D10-S4
                var d10s4 = new SymptomForDiagnose
                {
                    symptom = nedsatt_apetitt,
                    diagnose = hjernerystelse
                };
                //Lagrer i databasen
                context.Diagnoser.Add(hjernerystelse);
                context.SymptomForDiagnose.Add(d10s1);
                context.SymptomForDiagnose.Add(d10s2);
                context.SymptomForDiagnose.Add(d10s3);
                context.SymptomForDiagnose.Add(d10s4);


                //LAGRER ALLE ENDRINGER I DATABASEN
                context.SaveChanges();
            }
        }
    }
}
