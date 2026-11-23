/* ---------- Evidence topics, grades and plain-English terms ---------- */
const TOPICS={all:"All",guide:"Guidelines",changes:"Hormone changes",safety:"Safety and checks",body:"Body and movement",binding:"Binding and tucking",mind:"Mind and emotions",social:"Social and legal",surgery:"Surgery"};
const GRADE={strong:["g-strong","Strong"],mod:["g-mod","Moderate"],weak:["g-weak","Weak"],no:["g-no","Not supported"]};
const GLOSS={
gender:["Gender identity","Your inner sense of being a woman, a man, both, neither, or somewhere else. It can't be seen from outside."],
trans:["Trans or transgender","Describes people whose gender identity is different from the sex they were assigned (recorded) at birth."],
tgd:["Trans and gender diverse","An umbrella phrase for trans women, trans men, non-binary people and everyone whose gender differs from the one assigned at birth."],
nonbinary:["Non-binary","A gender identity that isn't only woman or only man. Some non-binary people use they/them pronouns; many use other pronouns."],
cis:["Cisgender (cis)","Describes people whose gender identity matches the sex they were assigned at birth."],
assigned:["Assigned at birth","The sex written down when you were born, usually based on how your body looked. Often shortened to AFAB (assigned female at birth) or AMAB (assigned male at birth)."],
dysphoria:["Gender dysphoria","Distress or unease that can come from a mismatch between your gender and your body, or how others see you. Not every trans person has it, and it can ease with care and support."],
incongruence:["Gender incongruence","The World Health Organization's term (in its ICD-11 classification) for a marked and lasting mismatch between a person's gender and their assigned sex. It sits under sexual health, not mental illness."],
euphoria:["Gender euphoria","The joyful feeling of rightness when your body, your clothes or the way people treat you fits your gender."],
transition:["Transition or affirmation","The steps a person takes to live as their gender. They can be social (name, pronouns, clothes), medical (hormones, surgery) and legal (documents). There's no single path."],
gaht:["Gender-affirming hormone therapy (GAHT)","Hormone medicines that change your body's features to match your gender better. Feminising therapy is based on estradiol; masculinising therapy is based on testosterone."],
estradiol:["Estradiol","The main oestrogen (a female-typical sex hormone) made by the ovaries, and the medicine used for feminising hormone therapy. Taken as a patch, gel, tablet or implant."],
oestrogen:["Oestrogen","A group of sex hormones that, among other things, grow breast tissue, shape body fat and protect bones. Estradiol is the main one."],
testosterone:["Testosterone","The main androgen (a male-typical sex hormone) made by the testes, and the medicine used for masculinising hormone therapy. Given as an injection, gel or cream."],
antiandrogen:["Anti-androgen","A medicine that lowers testosterone or blocks its effects. In Australia the usual ones are cyproterone acetate and spironolactone."],
cpa:["Cyproterone acetate","A tablet that blocks testosterone and lowers how much the body makes. Low doses work as well as high ones, with fewer side effects."],
spiro:["Spironolactone","A tablet first used for blood pressure that also blocks testosterone. It can raise potassium and make you pass more urine."],
progesterone:["Progesterone","A hormone some people add to feminising therapy. The evidence for benefits is limited, so it's reviewed after 3 to 6 months."],
gnrh:["GnRH analogue","A medicine (usually an injection or implant) that switches off the brain's signal to the testes or ovaries, so they make very little hormone."],
dht:["DHT (dihydrotestosterone)","A stronger form of testosterone made in the skin and hair roots. It drives facial hair, acne and scalp hair loss."],
aromatase:["Aromatase","An enzyme that turns some testosterone into estradiol. That small amount of estradiol is important for keeping bones strong."],
hpg:["Hormone control loop","The brain's hypothalamus signals the pituitary gland, which signals the testes or ovaries to make sex hormones. Rising hormone levels then tell the brain to ease off (negative feedback)."],
pituitary:["Pituitary gland","A pea-sized gland under the brain. It sends the hormones LH and FSH to the testes or ovaries."],
feedback:["Negative feedback","When a hormone's own level tells the brain to make less of the signal that produced it, like a thermostat."],
consent:["Informed consent","Agreeing to a treatment once you understand what it can and can't do, the risks and the alternatives. In Australia it's the usual way adults start hormones with a GP."],
fertility:["Fertility preservation","Storing sperm, eggs or embryos before treatment that may reduce fertility, so having a genetic child later is still possible."],
teratogen:["Teratogen","Something that can harm a developing baby. Testosterone is one, so it must not be used in pregnancy."],
vte:["Blood clot in a vein (VTE)","Venous thromboembolism: a clot in a deep vein, usually in the leg (deep vein thrombosis), which can travel to the lungs (pulmonary embolism). Signs include one-sided calf pain or swelling, chest pain or sudden breathlessness."],
haematocrit:["Haematocrit","The share of your blood made up of red blood cells. On testosterone it should stay below 0.50 (50%)."],
erythrocytosis:["Erythrocytosis","Too many red blood cells, which makes the blood thicker. A known effect of testosterone, checked with regular blood tests."],
meningioma:["Meningioma","A slow-growing, usually non-cancerous tumour of the brain's lining. It has been linked with long use of higher-dose cyproterone acetate."],
prolactin:["Prolactin","A hormone from the pituitary gland. Some feminising medicines can raise it, so it may be checked."],
bmd:["Bone mineral density","How much mineral is packed into bone, measured with a DXA scan (a low-dose X-ray). Lower density means weaker bone."],
dxa:["DXA scan","A low-dose X-ray scan that measures bone density, and can also measure fat and muscle."],
osteoporosis:["Osteoporosis","Bone that has become thin and fragile, so it breaks more easily, often after a minor fall."],
lean:["Lean mass","Everything in the body that isn't fat or bone mineral: mostly muscle, organs and water."],
tendon:["Tendon","The tough cord that joins a muscle to bone, such as the Achilles tendon at the heel. Tendons adapt to load more slowly than muscles."],
hypermobility:["Hypermobility","Joints that move further than usual. With pain, frequent sprains or other symptoms it may be hypermobility spectrum disorder or hypermobile Ehlers-Danlos syndrome."],
pelvicfloor:["Pelvic floor","The sling of muscles at the base of the pelvis that supports the bladder and bowel and helps control them."],
pitch:["Pitch","How high or low a voice sounds. Measured as the voice's main frequency (in hertz, Hz). Typical speaking pitch is about 100 to 140 Hz for men and 180 to 220 Hz for women, with lots of overlap."],
resonance:["Resonance","How the throat and mouth shape and colour the voice. Changing resonance affects how 'bright' or 'dark' a voice sounds, separately from pitch."],
binder:["Binder","A tight, purpose-made top or vest that flattens the chest."],
tucking:["Tucking","Positioning the penis and testes back between the legs, sometimes with the testes moved up into the groin, for a flatter look. Often done with a gaff (firm underwear) or tape."],
packing:["Packing","Wearing a soft prosthetic penis (a packer) in underwear."],
minority:["Minority stress","The extra, ongoing stress that comes from prejudice, discrimination and the need to stay on guard, on top of everyday stress."],
internalised:["Internalised transphobia","Taking in society's negative messages about trans people and turning them on yourself."],
dilation:["Dilation","After vaginoplasty, regularly inserting a smooth, rounded medical dilator to keep the new vagina open, as the body tends to close it while healing. It continues long term."],
vaginoplasty:["Vaginoplasty","Surgery that creates a vagina, clitoris and labia, usually using penile and scrotal skin, sometimes with the lining of the abdomen (peritoneum) or bowel."],
vulvoplasty:["Vulvoplasty","Surgery that creates the outer genitals (vulva and clitoris) without a deep vaginal canal, so no dilation is needed. Also called zero-depth vaginoplasty."],
orchidectomy:["Orchidectomy","Removal of the testes. Testosterone falls to very low levels, so anti-androgens are usually no longer needed."],
phalloplasty:["Phalloplasty","Surgery that creates a penis using a flap of skin and tissue, most often from the forearm or thigh, usually in stages."],
metoidioplasty:["Metoidioplasty","Surgery that releases the clitoris (enlarged by testosterone) to form a small penis, often with lengthening of the urethra."],
hysterectomy:["Hysterectomy","Removal of the uterus (womb). Removal of the ovaries is called oophorectomy, and may be done at the same time."],
topsurgery:["Top surgery","Chest surgery. For a flatter chest it removes breast tissue (masculinising chest reconstruction); for a fuller chest it adds breast implants (augmentation)."],
ffs:["Facial feminisation surgery (FFS)","Operations on the bones and soft tissues of the face, such as the brow, jaw, chin or nose, to give a more typically feminine look."],
glottoplasty:["Glottoplasty","Voice surgery that shortens the vibrating part of the vocal folds to raise pitch."],
fistula:["Fistula","An abnormal opening that forms between two body parts, such as between the urethra and the skin."],
stricture:["Stricture or stenosis","A narrowing, for example of the urethra (stricture) or of the vagina after vaginoplasty (stenosis)."],
haematoma:["Haematoma","A collection of blood under the skin after surgery or injury. Large ones sometimes need draining."],
graft:["Free nipple graft","Removing the nipples during top surgery and placing them back as skin grafts in a new position. Sensation is usually reduced."],
donor:["Donor site","The part of the body, such as the forearm or thigh, from which skin and tissue are taken to build a new structure."],
electrolysis:["Electrolysis","Permanent hair removal that destroys each hair root with a tiny electrical current. Laser works on dark hair over a larger area."],
statdec:["Statutory declaration","A written statement you sign in front of an authorised witness, declaring it to be true. Making a false one is an offence."],
pmid:["PMID and DOI","A PMID is the number that identifies a study in PubMed, the US National Library of Medicine's database of medical research. A DOI is a permanent web address for the published article."],
rct:["Randomised trial","A study in which people are allocated by chance to a treatment or a comparison group, so differences in results can be put down to the treatment."],
cohort:["Cohort study","A study that follows a group of people over time and looks for links. It shows links, not proof of cause."],
crosssec:["Cross-sectional study","A study, such as a survey, that looks at a group at one point in time. It can show links but not which came first."],
meta:["Meta-analysis","A study that pools the results of many earlier studies to give a more reliable overall answer."],
review:["Systematic review","A review that searches for and appraises all the studies on a question in a planned, repeatable way."],
odds:["Odds ratio","A way of comparing how likely something is in one group compared with another. 1 means no difference; 2 means about twice the odds."],
pbs:["PBS","The Pharmaceutical Benefits Scheme, which subsidises medicines in Australia."],
neuro:["Neurodivergent","Having a brain that works differently from what is considered typical, as in autism or ADHD."],
regret:["Regret","In surgical studies, a person saying they wish they had not had the operation. Studies define and measure it in different ways."],
detrans:["Detransition","Stopping or reversing some or all steps of transition. People do this for many reasons, and some later transition again."]
};

/* ---------- Navigation ----------
   NAV is the reading order (the "keep reading" links follow it). Each page belongs to one of six areas, or to none.
   AREAS are the six coloured tiles on the home page and the pills in the header; t is the tile colour, m the marker colour. */
const NAV=[
{id:"home",l:"Home",s:"Where to begin"},
{id:"start",l:"About this guide",s:"Three things to know, words, privacy"},
{id:"bloom",l:"Your bloom",s:"Moments to mark, and the seven stages"},
{id:"hormones",l:"How hormones work",s:"Medicines, consent, fertility",a:"hormones"},
{id:"changes",l:"What changes, and when",s:"Timeline and body map",a:"changes"},
{id:"safety",l:"Staying safe on hormones",s:"Checks, risks, urgent signs",a:"hormones"},
{id:"body",l:"Body and movement",s:"Muscle, bone, joints, voice",a:"body"},
{id:"binding",l:"Binding, tucking and packing",s:"Gentler ways, breathing",a:"body"},
{id:"mind",l:"Mind and emotions",s:"Feelings, stress, support",a:"mind"},
{id:"social",l:"Family, friends and the world",s:"Telling people, rights, documents",a:"life"},
{id:"daily",l:"Daily life and habits",s:"Taking hormones, sex, skin, travel",a:"life"},
{id:"family",l:"For family and supporters",s:"How to help, and your own feelings",a:"life"},
{id:"surgery",l:"Surgery: your options",s:"Choices, outcomes, preparing",a:"surgery"},
{id:"recovery",l:"Surgery: recovery",s:"Stage by stage, warning signs",a:"surgery"},
{id:"clinicians",l:"For clinicians",s:"Affirming, hands-on care"},
{id:"evidence",l:"Evidence library",s:"Sources and grades"},
{id:"support",l:"Getting help",s:"People and services"}
];
const AREAS=[
{id:"hormones",l:"Hormones",full:"Hormones",t:"t1",m:"var(--gold)",i:"hormone",first:"hormones",d:"What they do, the medicines used in Australia, and consent."},
{id:"changes",l:"Changes",full:"What changes, when",t:"t2",m:"var(--coral)",i:"chart",first:"changes",d:"Month by month to five years, on estradiol or testosterone."},
{id:"body",l:"Body",full:"Body and movement",t:"t3",m:"var(--teal)",i:"body",first:"body",d:"Muscle, bone, posture, binding and the pelvic floor."},
{id:"mind",l:"Mind",full:"Mind and emotions",t:"t4",m:"var(--accent)",i:"mind",first:"mind",d:"Mood, dysphoria and euphoria, stress and support."},
{id:"life",l:"Life",full:"Life and people",t:"t5",m:"color-mix(in srgb,var(--t5) 45%,var(--coral-text))",i:"people",first:"social",d:"Telling people, work, documents, your rights, and help for family."},
{id:"surgery",l:"Surgery",full:"Surgery",t:"t6",m:"var(--t6)",i:"plaster",first:"surgery",d:"Options, honest outcomes and recovery, stage by stage."}
];
/* Pages outside the six areas, and their icons */
const PAGE_ICON={home:"home",start:"info",bloom:"flower",family:"family",clinicians:"steth",evidence:"library",support:"phone"};
/* "Find what fits me": a few honest starting points */
const FIT=[
{t:"I'm wondering about my gender",d:"Words that might fit, the stages many people pass through, and people to talk to.",go:"start",i:"spark"},
{t:"I'm thinking about starting hormones",d:"How hormones work, consent in Australia, fertility, and what to ask.",go:"hormones",i:"hormone"},
{t:"I've started hormones",d:"What usually changes and when, the regular checks, and staying well.",go:"changes",i:"chart"},
{t:"I want to look after my body",d:"Training, bones, posture, binding, tucking and the pelvic floor.",go:"body",i:"body"},
{t:"I'm finding things hard",d:"Feelings on hormones, the stress of prejudice, and what helps.",go:"mind",i:"mind"},
{t:"I'm considering surgery",d:"The options, honest outcomes, preparing well, and recovery.",go:"surgery",i:"plaster"},
{t:"Someone I love is trans",d:"What helps, your own feelings, and the questions families often ask.",go:"family",i:"family"},
{t:"I'm a clinician",d:"Affirming hands-on care, what changes in the body, and red flags.",go:"clinicians",i:"steth"}
];
/* Line icons, drawn for Aster (filled in by build.py) */
const ICONS=/*ICONS*/{};

/* ---------- Where you live: services and emergency numbers ----------
   Numbers and hours checked on the services' own or government websites on 21 November 2026. */
const REGIONS={
au:{n:"Australia",em:"000",groups:[
 {t:"Right now",items:[
  {o:"Emergency",d:"If you or someone else is in danger, or seriously unwell or injured.",ph:"000",h:"24 hours, 7 days",who:"Emergency"},
  {o:"Lifeline",d:"Crisis support from a trained supporter, by phone, text or online chat.",ph:"13 11 14",h:"24 hours, 7 days. Text 0477 13 11 14",u:"https://www.lifeline.org.au",who:"Crisis support"},
  {o:"13YARN",d:"Crisis support from an Aboriginal or Torres Strait Islander supporter.",ph:"13 92 76",h:"24 hours, 7 days",u:"https://www.13yarn.org.au",who:"Crisis support"},
  {o:"Suicide Call Back Service",d:"Phone and online counselling for anyone thinking about suicide, or affected by it.",ph:"1300 659 467",h:"24 hours, 7 days",u:"https://www.suicidecallbackservice.org.au",who:"Crisis support"},
  {o:"Kids Helpline",d:"Counselling for young people aged 5 to 25, by phone or webchat.",ph:"1800 55 1800",h:"24 hours, 7 days",u:"https://kidshelpline.com.au",who:"Young people"}]},
 {t:"Talk to LGBTIQA+ peers",items:[
  {o:"QLife",d:"Free, anonymous peer support from LGBTIQA+ people, for anyone wanting to talk about gender, bodies, feelings or relationships, and for the people who support them. Phone or webchat.",ph:"1800 184 527",h:"3 pm to 9 pm in your state's local time, every day",u:"https://qlife.org.au",who:"Peer support"},
  {o:"Rainbow Door (Victoria)",d:"Free specialist support, information and referral for LGBTIQA+ Victorians and their families, including family violence and mental health. Call, text or email.",ph:"1800 729 367",h:"10 am to 5 pm, 7 days. Text 0480 017 246",u:"https://www.rainbowdoor.org.au",who:"Peer support"},
  {o:"Transgender Victoria",d:"Trans-led peer support groups, peer navigation and the Affirmation Station community space in Brunswick East. Contact them through their website. Not an emergency service.",u:"https://www.tgv.org.au",who:"Community"}]},
 {t:"Gender-affirming health care",items:[
  {o:"Your GP",d:"Many GPs prescribe and monitor hormones using informed consent. Ask whether your GP has experience, or look for one who does.",who:"Medical"},
  {o:"AusPATH provider directory",d:"The Australian Professional Association for Trans Health lists clinicians who provide gender-affirming care, by state.",u:"https://auspath.org.au/providers/",who:"Find a clinician"},
  {o:"Equinox (Thorne Harbour Health, Melbourne)",d:"A general practice for trans and gender diverse people in Abbotsford, where GPs can start hormones using the informed consent model.",ph:"(03) 9416 2889",u:"https://www.thorneharbour.org/services/trans-and-gender-diverse-clinic",who:"Medical"},
  {o:"Monash Health Gender Clinic",d:"Victoria's public specialist gender service, for people aged 16 and over. Your GP refers you by e-referral. Waits can be long.",u:"https://monashhealth.org/services/gender-clinic/",who:"Public service"},
  {o:"Austin Health Gender Clinic",d:"Time-limited specialist hormone (endocrinology) support for adults 18 and over, shared with your own GP or doctor, who refers you. At the Heidelberg Repatriation Hospital, Ivanhoe.",u:"https://austin.org.au/gender-clinic",who:"Public service"},
  {o:"NURSE-ON-CALL (Victoria) and healthdirect",d:"Free health advice from a registered nurse. In Victoria call NURSE-ON-CALL; in Queensland, 13HEALTH on 13 43 25 84; elsewhere, healthdirect on 1800 022 222.",ph:"1300 60 60 24",h:"24 hours, 7 days",u:"https://www.healthdirect.gov.au",who:"Phone advice"}]},
 {t:"Information and community",items:[
  {o:"TransHub",d:"Plain-language information on social, medical and legal affirmation in Australia, from ACON.",u:"https://www.transhub.org.au",who:"Information"},
  {o:"Minus18",d:"Events, resources and community for LGBTQIA+ young people.",u:"https://www.minus18.org.au",who:"Young people"},
  {o:"Transcend Australia",d:"Support and information for trans young people and their families.",u:"https://transcend.org.au",who:"Families"},
  {o:"Quitline",d:"Free, confidential counselling to stop smoking or vaping. A safe space for LGBTIQA+ people, with LGBTIQA+ peers working in the service. You can also ask for a call back online.",ph:"13 7848",h:"Weekdays 8 am to 8 pm; hours vary by state",u:"https://www.quit.org.au",who:"Health"},
  {o:"Butterfly National Helpline",d:"Free, confidential support for anyone worried about eating, weight or body image, for themselves or someone else. Phone, webchat or email.",ph:"1800 33 4673",h:"8 am to midnight (AEST/AEDT), 7 days",u:"https://butterfly.org.au",who:"Health"}]},
 {t:"Rights, documents and safety",items:[
  {o:"Births, Deaths and Marriages Victoria",d:"Change the sex recorded on your Victorian birth certificate, or get a recognised details certificate if you were born elsewhere. Free.",u:"https://www.bdm.vic.gov.au/change-a-record-of-sex/adult-born-in-victoria",who:"Documents"},
  {o:"Victorian Equal Opportunity and Human Rights Commission",d:"Information and complaints about discrimination, and reports of change or suppression (conversion) practices.",ph:"1300 292 153",u:"https://www.humanrights.vic.gov.au",who:"Rights"},
  {o:"Australian Human Rights Commission",d:"Complaints about discrimination under federal law, including because of gender identity.",ph:"1300 656 419",u:"https://humanrights.gov.au",who:"Rights"},
  {o:"1800RESPECT",d:"Counselling and support for sexual, domestic and family violence.",ph:"1800 737 732",h:"24 hours, 7 days",u:"https://www.1800respect.org.au",who:"Safety"},
  {o:"Safe Steps (Victoria)",d:"Victoria's family violence response centre.",ph:"1800 015 188",h:"24 hours, 7 days",u:"https://www.safesteps.org.au",who:"Safety"}]}]},
nz:{n:"New Zealand",em:"111",groups:[
 {t:"Right now",items:[
  {o:"Emergency",d:"If you or someone else is in danger or seriously unwell.",ph:"111",h:"24 hours, 7 days",who:"Emergency"},
  {o:"Need to talk? 1737",d:"Free call or text to talk with a trained counsellor.",ph:"1737",h:"24 hours, 7 days",u:"https://1737.org.nz",who:"Crisis support"},
  {o:"Lifeline Aotearoa",d:"Free, confidential support. Free text HELP (4357).",ph:"0800 543 354",h:"24 hours, 7 days",u:"https://www.lifeline.org.nz",who:"Crisis support"}]},
 {t:"Rainbow support and health advice",items:[
  {o:"OutLine Aotearoa",d:"Rainbow peer support line and online chat for people of all ages, their friends and whānau. Not a crisis line.",ph:"0800 688 5463",h:"6 pm to 9 pm, every day",u:"https://outline.org.nz",who:"Peer support"},
  {o:"Healthline",d:"Free health advice from nurses and other clinicians. Interpreters available.",ph:"0800 611 116",h:"24 hours, 7 days",u:"https://info.health.nz",who:"Phone advice"}]}]},
uk:{n:"United Kingdom",em:"999",groups:[
 {t:"Right now",items:[
  {o:"Emergency",d:"If you or someone else is in danger or seriously unwell.",ph:"999",h:"24 hours, 7 days",who:"Emergency"},
  {o:"Samaritans",d:"Someone to talk to, whatever you're going through.",ph:"116 123",h:"24 hours, 7 days",u:"https://www.samaritans.org",who:"Crisis support"},
  {o:"NHS 111",d:"Urgent medical help and advice when it isn't an emergency.",ph:"111",h:"24 hours, 7 days",u:"https://111.nhs.uk",who:"Phone advice"}]},
 {t:"LGBTQIA+ and trans support",items:[
  {o:"Switchboard",d:"The national LGBTQIA+ support line, answered by LGBTQIA+ volunteers. Phone, webchat or email.",ph:"0800 0119 100",h:"10 am to 10 pm, every day",u:"https://switchboard.lgbt",who:"Peer support"},
  {o:"MindLine Trans+",d:"A listening line for trans, non-binary and gender diverse people and their families, run by Mind in Somerset. Opening hours change, so check the website.",ph:"0300 330 5468",u:"https://www.mindinsomerset.org.uk",who:"Peer support"}]}]},
us:{n:"United States",em:"911",groups:[
 {t:"Right now",items:[
  {o:"Emergency",d:"If you or someone else is in danger or seriously unwell.",ph:"911",h:"24 hours, 7 days",who:"Emergency"},
  {o:"988 Suicide and Crisis Lifeline",d:"Call or text 988 for crisis support.",ph:"988",h:"24 hours, 7 days",u:"https://988lifeline.org",who:"Crisis support"}]},
 {t:"Trans and LGBTQ+ support",items:[
  {o:"Trans Lifeline",d:"Peer support run by and for trans people. Hours are limited, so check the website.",ph:"(877) 565-8860",u:"https://translifeline.org",who:"Peer support"},
  {o:"The Trevor Project",d:"Crisis support for LGBTQ+ young people under 25, by phone, text or chat.",ph:"1-866-488-7386",h:"24 hours, 7 days",u:"https://www.thetrevorproject.org",who:"Young people"}]}]},
ca:{n:"Canada",em:"911",groups:[
 {t:"Right now",items:[
  {o:"Emergency",d:"If you or someone else is in danger or seriously unwell.",ph:"911",h:"24 hours, 7 days",who:"Emergency"},
  {o:"9-8-8 Suicide Crisis Helpline",d:"Call or text 988 for crisis support.",ph:"988",h:"24 hours, 7 days",u:"https://988.ca",who:"Crisis support"}]},
 {t:"Trans support",items:[
  {o:"Trans Lifeline (Canada)",d:"Peer support run by and for trans people. Hours are limited, so check the website.",ph:"(877) 330-6366",u:"https://translifeline.org",who:"Peer support"}]}]},
other:{n:"Elsewhere",em:"",groups:[
 {t:"Where to start",items:[
  {o:"Local emergency number",d:"Use your local emergency number if you or someone else is in danger or seriously unwell.",who:"Emergency"},
  {o:"Find A Helpline",d:"A directory of free, confidential helplines in many countries, which you can filter by topic, including gender and sexuality.",u:"https://findahelpline.com",who:"Directory"},
  {o:"A doctor you trust",d:"Ask about gender-affirming care where you live, and about local trans community groups.",who:"Medical"}]}]}
};
const RORDER=["au","nz","uk","us","ca","other"];
function guessRegion(){let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";}catch(e){}
  if(/^Australia\//.test(tz))return"au";if(/^Pacific\/(Auckland|Chatham)/.test(tz))return"nz";if(/^Europe\/(London|Belfast)|^Europe\/Isle_of_Man|^Europe\/Jersey|^Europe\/Guernsey/.test(tz))return"uk";
  if(/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Glace_Bay|Goose_Bay|Iqaluit|Whitehorse|Yellowknife|Dawson|Inuvik|Rankin_Inlet|Cambridge_Bay|Swift_Current|Atikokan|Creston|Fort_Nelson|Dawson_Creek|Blanc-Sablon)/.test(tz))return"ca";
  if(/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana|Kentucky|North_Dakota|Menominee|Adak|Juneau|Sitka|Metlakatla|Yakutat|Nome)|^Pacific\/Honolulu/.test(tz))return"us";
  return tz?"other":"au";}

/* ---------- Palettes (generated by tools/palettes.py, contrast-checked) ---------- */
const PALS=/*PALS*/[];
