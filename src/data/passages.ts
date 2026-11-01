import { Passage } from '../types/question';

export const PASSAGES: Passage[] = [
  // 1. Biology — The Importance of Pollination
  {
    id: 1,
    subject: "Biology",
    topicCategory: "Ecological Systems",
    title: "The Importance of Pollination",
    sentences: [
      "Angiosperms rely heavily on external agents to facilitate sexual reproduction across geographically separated individual plants.",
      "While abiotic factors such as wind circulate pollen grains intermittently, biotic pollinators provide substantially higher targeting efficiency.",
      "Honeybees visit hundreds of blossoms daily to harvest nutrient-rich nectar and proteinaceous pollen.",
      "When the pollinator subsequently lands on a conspecific flower, pollen grains brush against the receptive stigma, thereby completing fertilization.",
      "Consequently, maintaining healthy pollinator populations is directly tied to the structural resilience of terrestrial food webs."
    ],
    question: "Which sentence explains the exact physical mechanism by which pollen is transferred to the reproductive organ of a recipient flower?",
    correctAnswerIndex: 3, // D
    correctSentence: "When the pollinator subsequently lands on a conspecific flower, pollen grains brush against the receptive stigma, thereby completing fertilization.",
    explanation: "Sentence [D] specifically identifies how transferred pollen meets the recipient flower's female reproductive structure (the receptive stigma), thereby completing the fertilization process.",
    distractorExplanations: {
      0: "Sentence [A] states that flowering plants depend on external agents generally, but does not describe the physical transfer mechanism to the recipient flower.",
      1: "Sentence [B] compares abiotic and biotic pollination targeting efficiency rather than describing the mechanical transfer process.",
      2: "Sentence [C] explains what bees harvest (nectar and pollen) during visits, not how pollen reaches the recipient flower's stigma.",
      4: "Sentence [E] summarizes the overarching ecological importance of pollinators for terrestrial food webs."
    }
  },

  // 2. Environmental Science — The Effects of Deforestation
  {
    id: 2,
    subject: "Environmental Science",
    topicCategory: "Ecosystem Degradation",
    title: "The Effects of Deforestation",
    sentences: [
      "Tropical rainforests serve as massive terrestrial carbon reservoirs, sequestering hundreds of billions of tons of atmospheric carbon dioxide.",
      "Widespread clear-cutting of these dense canopies fundamentally disrupts regional and global hydrological cycles.",
      "Because root networks anchor the upper horizons of soil, removing forest cover leaves topsoil directly vulnerable to heavy tropical precipitation.",
      "Unchecked torrential rains rapidly wash away vital nutrient layers, precipitating severe erosion and turning formerly fertile land into barren substrates.",
      "Furthermore, the loss of canopy transpiration reduces atmospheric moisture return, triggering prolonged regional droughts."
    ],
    question: "Which sentence identifies the primary cause of severe topsoil erosion following forest clearance?",
    correctAnswerIndex: 2, // C
    correctSentence: "Because root networks anchor the upper horizons of soil, removing forest cover leaves topsoil directly vulnerable to heavy tropical precipitation.",
    explanation: "Sentence [C] directly identifies the causal mechanism of soil erosion: the elimination of root networks that anchor soil layers, leaving them exposed to rainfall.",
    distractorExplanations: {
      0: "Sentence [A] describes the role of forests as carbon reservoirs, which is unrelated to topsoil erosion mechanics.",
      1: "Sentence [B] introduces the disruption of hydrological cycles broadly without explaining what triggers soil erosion.",
      3: "Sentence [D] describes what the rain does after soil is exposed, rather than identifying the primary underlying cause (removal of anchoring roots).",
      4: "Sentence [E] focuses on atmospheric moisture loss and regional droughts, not soil erosion."
    }
  },

  // 3. Astronomy — The Formation of Planets
  {
    id: 3,
    subject: "Astronomy",
    topicCategory: "Astrophysics & Planetary Science",
    title: "The Formation of Planets",
    sentences: [
      "Planetary formation begins within circumstellar accretion disks composed of gas and interstellar dust orbiting young protostars.",
      "Initially, microscopic mineral grains collide at low velocities and adhere together primarily through weak electrostatic forces.",
      "Over millions of years, these tiny agglomerations grow into kilometer-sized bodies known as planetesimals.",
      "Once planetesimals attain sufficient mass, mutual gravitational attraction surpasses electromagnetic forces and accelerates the collision rate.",
      "This runaway gravitational accretion allows protoplanets to sweep up surrounding orbital debris and clear wide gaps in the circumstellar disk."
    ],
    question: "Which sentence identifies the point at which gravity becomes the dominant force driving collisions between forming planetary bodies?",
    correctAnswerIndex: 3, // D
    correctSentence: "Once planetesimals attain sufficient mass, mutual gravitational attraction surpasses electromagnetic forces and accelerates the collision rate.",
    explanation: "Sentence [D] explicitly states the transition threshold: when planetesimals reach sufficient mass such that mutual gravitational attraction overcomes electrostatic forces to speed up collisions.",
    distractorExplanations: {
      0: "Sentence [A] sets the astronomical setting (circumstellar accretion disks) without describing forces.",
      1: "Sentence [B] refers to the initial phase dominated by weak electrostatic forces among microscopic dust grains.",
      2: "Sentence [C] describes the timeline and formation of kilometer-sized planetesimals before gravity becomes dominant.",
      4: "Sentence [E] details runaway accretion and the clearing of orbital disk gaps, which occurs after gravity has already assumed control."
    }
  },

  // 4. Psychology — The Development of Human Memory
  {
    id: 4,
    subject: "Psychology",
    topicCategory: "Cognitive Neuroscience",
    title: "The Development of Human Memory",
    sentences: [
      "Human memory is not a unitary entity but rather a complex architecture comprising distinct sensory, working, and long-term stores.",
      "Working memory possesses a strictly constrained capacity, retaining information for only brief intervals unless reinforced through active cognitive rehearsal.",
      "To transfer transient information into stable long-term storage, the brain undergoes a neurobiological consolidation process centered in the hippocampus.",
      "During consolidation, synaptic connections are biochemically reinforced through long-term potentiation, reorganizing temporary traces into durable cortical networks.",
      "Disruptions to this consolidation window frequently produce anterograde amnesia, rendering individuals incapable of forming lasting episodic memories."
    ],
    question: "Which sentence describes the cellular and structural mechanism that converts temporary memory traces into durable long-term storage?",
    correctAnswerIndex: 3, // D
    correctSentence: "During consolidation, synaptic connections are biochemically reinforced through long-term potentiation, reorganizing temporary traces into durable cortical networks.",
    explanation: "Sentence [D] details the exact cellular mechanism (long-term potentiation reinforcing synaptic connections and reorganizing traces into durable cortical networks).",
    distractorExplanations: {
      0: "Sentence [A] provides an introductory overview of memory's three main theoretical stores.",
      1: "Sentence [B] describes the temporal and capacity limitations of working memory.",
      2: "Sentence [C] introduces memory consolidation and identifies the hippocampus, but does not describe the cellular mechanism itself.",
      4: "Sentence [E] mentions memory failure (anterograde amnesia) when consolidation is interrupted."
    }
  },

  // 5. History — The Development of Ancient Trade Routes
  {
    id: 5,
    subject: "History",
    topicCategory: "Ancient Civilizations",
    title: "The Development of Ancient Trade Routes",
    sentences: [
      "The ancient Silk Road was an expansive network of overland and maritime arteries linking East Asia with the Mediterranean.",
      "Caravans traversing arid Central Asian deserts carried high-value, low-bulk commodities such as silk, spices, glassware, and precious gemstones.",
      "Beyond commercial commodities, these transcontinental corridors functioned as conduits for unprecedented cultural and technological exchange.",
      "Crucially, the dissemination of Chinese papermaking technology westward radically transformed administrative recordkeeping throughout the Islamic world.",
      "However, commercial movements also inadvertently facilitated the catastrophic dissemination of epidemic pathogens across continents."
    ],
    question: "Which sentence provides a specific historical example of a technical innovation transferred westward through trade corridors?",
    correctAnswerIndex: 3, // D
    correctSentence: "Crucially, the dissemination of Chinese papermaking technology westward radically transformed administrative recordkeeping throughout the Islamic world.",
    explanation: "Sentence [D] explicitly names Chinese papermaking technology as the specific technical innovation transferred westward and highlights its concrete administrative impact.",
    distractorExplanations: {
      0: "Sentence [A] defines the geographical scope and network nature of the Silk Road.",
      1: "Sentence [B] lists luxury commodities (silk, spices, glassware) rather than a technical innovation.",
      2: "Sentence [C] makes a general claim about cultural and technological exchange without providing the specific technical example.",
      4: "Sentence [E] notes the negative transmission of infectious diseases."
    }
  },

  // 6. Economics — Supply and Demand
  {
    id: 6,
    subject: "Economics",
    topicCategory: "Microeconomic Theory",
    title: "Supply and Demand",
    sentences: [
      "In classical microeconomic theory, competitive market prices are governed by the dynamic interaction between consumer demand and producer supply.",
      "Under ordinary conditions, the law of demand dictates that as the unit price of a commodity increases, consumer willingness to purchase declines.",
      "Conversely, according to the law of supply, elevated market prices incentivize manufacturers to expand production capacity.",
      "Market equilibrium is achieved at the precise intersection where the aggregate quantity demanded by consumers matches the aggregate quantity supplied by firms.",
      "If prevailing prices are artificially held below this clearing threshold, persistent shortages arise as consumer demand outstrips available merchandise."
    ],
    question: "Which sentence defines the exact condition required for a competitive market to reach equilibrium?",
    correctAnswerIndex: 3, // D
    correctSentence: "Market equilibrium is achieved at the precise intersection where the aggregate quantity demanded by consumers matches the aggregate quantity supplied by firms.",
    explanation: "Sentence [D] directly provides the definition of market equilibrium: the intersection where aggregate quantity demanded equals aggregate quantity supplied.",
    distractorExplanations: {
      0: "Sentence [A] introduces the overall relationship between supply, demand, and prices in broad theoretical terms.",
      1: "Sentence [B] outlines the law of demand (inverse relationship between price and quantity demanded).",
      2: "Sentence [C] outlines the law of supply (direct relationship between price and quantity supplied).",
      4: "Sentence [E] describes the disequilibrium outcome (shortage) caused by artificial price ceilings."
    }
  },

  // 7. Technology — The Evolution of Artificial Intelligence
  {
    id: 7,
    subject: "Technology",
    topicCategory: "Computer Science",
    title: "The Evolution of Artificial Intelligence",
    sentences: [
      "Early artificial intelligence research focused predominantly on symbolic approaches, utilizing hand-coded formal logic and expert heuristic rules.",
      "Although these classical systems achieved notable success in bounded domains, they proved brittle when exposed to noisy, unstructured real-world data.",
      "A fundamental paradigm shift occurred with the resurgence of artificial neural networks, catalyzed by massive digital datasets and parallel processing units.",
      "Instead of adhering to human-crafted deterministic rules, deep learning models autonomously infer statistical representations directly from raw multi-dimensional inputs.",
      "Nevertheless, modern neural networks still struggle with explainability, often operating as opaque mathematical functions whose internal reasoning paths cannot be easily audited."
    ],
    question: "Which sentence explains how deep learning differs fundamentally from classical rule-based approaches in processing information?",
    correctAnswerIndex: 3, // D
    correctSentence: "Instead of adhering to human-crafted deterministic rules, deep learning models autonomously infer statistical representations directly from raw multi-dimensional inputs.",
    explanation: "Sentence [D] explicitly contrasts the two paradigms by explaining that deep learning models autonomously derive statistical representations from raw data rather than relying on human-crafted deterministic rules.",
    distractorExplanations: {
      0: "Sentence [A] describes the methodology of early symbolic AI without detailing deep learning's contrasting mechanism.",
      1: "Sentence [B] points out the operational limitations and brittleness of symbolic systems in real-world environments.",
      2: "Sentence [C] identifies the hardware and data catalysts that powered the neural network resurgence.",
      4: "Sentence [E] discusses the modern interpretability problem ('black-box' nature of neural networks)."
    }
  },

  // 8. Archaeology — Discoveries of Ancient Civilizations
  {
    id: 8,
    subject: "Archaeology",
    topicCategory: "Archaeological Science & Remote Sensing",
    title: "Discoveries of Ancient Civilizations",
    sentences: [
      "For centuries, field archaeologists were constrained to physical trench excavation and visible surface surveys to identify forgotten settlement ruins.",
      "Dense tropical vegetation and shifting sands frequently concealed extensive urban complexes from ground-based observation.",
      "The integration of airborne Light Detection and Ranging (LiDAR) has completely transformed non-invasive landscape archaeology.",
      "By firing hundreds of thousands of laser pulses per second toward the earth and calculating their return reflections, LiDAR digitally strips away forest canopies to reveal hidden topography.",
      "In the Petén Basin of Guatemala, this aerial technology uncovered thousands of previously undocumented Maya residences, defensive fortifications, and elevated canals."
    ],
    question: "Which sentence explains the technical principle that enables LiDAR to uncover archaeological features concealed beneath thick forest canopies?",
    correctAnswerIndex: 3, // D
    correctSentence: "By firing hundreds of thousands of laser pulses per second toward the earth and calculating their return reflections, LiDAR digitally strips away forest canopies to reveal hidden topography.",
    explanation: "Sentence [D] explains the technical principle: firing laser pulses per second and measuring return reflections to digitally remove canopy vegetation and expose underlying topography.",
    distractorExplanations: {
      0: "Sentence [A] describes traditional archaeological limitations (physical trenches and surface surveys).",
      1: "Sentence [B] highlights how tropical vegetation obscures ancient complexes, framing the problem rather than the technical solution.",
      2: "Sentence [C] introduces LiDAR as a revolutionary tool in general terms without describing how it works.",
      4: "Sentence [E] provides an empirical discovery outcome in Guatemala (Maya structures) rather than the operating principle."
    }
  },

  // 9. Geography — The Formation of Mountain Ranges
  {
    id: 9,
    subject: "Geography",
    topicCategory: "Physical Geography & Tectonics",
    title: "The Formation of Mountain Ranges",
    sentences: [
      "The Earth's lithosphere is fragmented into numerous rigid tectonic plates that float atop the ductile asthenosphere.",
      "Orogeny, the geological process of mountain building, occurs predominantly along convergent plate boundaries where opposing crustal slabs collide.",
      "When two continental plates converge, neither can be easily subducted due to their buoyant, low-density granitic compositions.",
      "Instead, the immense compressive stresses buckle, fracture, and thrust immense sequences of rock upward into towering mountain chains.",
      "Thus, a mountain range's visible silhouette represents an equilibrium between tectonic uplifting forces and persistent atmospheric denudation."
    ],
    question: "Which sentence explains why continental plates buckle upward into mountains rather than subducting into the Earth's mantle?",
    correctAnswerIndex: 2, // C
    correctSentence: "When two continental plates converge, neither can be easily subducted due to their buoyant, low-density granitic compositions.",
    explanation: "Sentence [C] directly provides the physical explanation: continental plates resist subduction because of their buoyant, low-density granitic composition, which forces them to buckle instead.",
    distractorExplanations: {
      0: "Sentence [A] introduces the basic structural relationship between the lithospheric plates and the asthenosphere.",
      1: "Sentence [B] defines orogeny and identifies convergent boundaries as the primary setting.",
      3: "Sentence [D] describes the mechanical consequence (buckling, fracturing, and thrusting) rather than explaining why subduction fails to occur.",
      4: "Sentence [E] discusses the dynamic equilibrium between tectonic uplift and denudation."
    }
  },

  // 10. Education — The Benefits of Active Learning
  {
    id: 10,
    subject: "Education",
    topicCategory: "Pedagogy & Cognitive Science",
    title: "The Benefits of Active Learning",
    sentences: [
      "Traditional pedagogical paradigms in higher education have long relied upon passive lecture formats where instructors transmit knowledge unilaterally.",
      "Educational psychologists have established that passive listening fosters low cognitive engagement, leading to rapid degradation of acquired facts.",
      "In contrast, active learning frameworks require students to engage directly in synthesis, collaborative debates, and real-time problem-solving.",
      "Engaging students in structured peer discussions forces them to confront conceptual misconceptions and articulate internal mental models in their own words.",
      "Empirical studies across STEM disciplines consistently show that active learning strategies significantly diminish academic failure rates and enhance conceptual retention."
    ],
    question: "Which sentence explains the cognitive reason why peer discussions help students clarify difficult concepts?",
    correctAnswerIndex: 3, // D
    correctSentence: "Engaging students in structured peer discussions forces them to confront conceptual misconceptions and articulate internal mental models in their own words.",
    explanation: "Sentence [D] explicitly identifies the cognitive mechanism: peer discussions force learners to confront their misconceptions and articulate their internal mental models.",
    distractorExplanations: {
      0: "Sentence [A] describes the traditional lecture model and unilateral knowledge transmission.",
      1: "Sentence [B] explains the negative cognitive consequences of passive listening.",
      2: "Sentence [C] defines the core activities of active learning (synthesis, debates, problem-solving) in general terms.",
      4: "Sentence [E] cites empirical research showing reduced failure rates and improved retention in STEM."
    }
  },

  // 11. Marine Biology — Coral Reef Ecosystems
  {
    id: 11,
    subject: "Marine Biology",
    topicCategory: "Ocean Ecology",
    title: "Coral Reef Ecosystems",
    sentences: [
      "Occupying less than one percent of the marine seafloor, coral reefs harbor more than twenty-five percent of all recognized ocean species.",
      "Scleractinian corals, the architects of these structures, secrete calcium carbonate skeletons that form complex three-dimensional habitats.",
      "The survival of reef-building corals hinges upon an obligate symbiotic association with microscopic photosynthetic dinoflagellates known as zooxanthellae.",
      "These endosymbiotic algae reside within coral gastrodermal tissues and provide up to ninety percent of the host's daily metabolic energy requirements through photosynthesis.",
      "Thermal stress caused by ocean warming disrupts this photosynthetic relationship, causing corals to expel the algae in a debilitating process termed bleaching."
    ],
    question: "Which sentence specifies the quantitative contribution that symbiotic algae provide to the coral host's energy budget?",
    correctAnswerIndex: 3, // D
    correctSentence: "These endosymbiotic algae reside within coral gastrodermal tissues and provide up to ninety percent of the host's daily metabolic energy requirements through photosynthesis.",
    explanation: "Sentence [D] explicitly states the exact quantitative metric: the zooxanthellae provide up to ninety percent of the coral host's daily metabolic energy through photosynthesis.",
    distractorExplanations: {
      0: "Sentence [A] provides biodiversity statistics (one percent of seafloor, twenty-five percent of marine species).",
      1: "Sentence [B] explains the architectural role of scleractinian corals and calcium carbonate secretion.",
      2: "Sentence [C] introduces the obligate symbiotic relationship with zooxanthellae without stating the quantitative energy contribution.",
      4: "Sentence [E] describes how elevated seawater temperatures cause coral bleaching."
    }
  },

  // 12. Physics — The Principles of Solar Energy
  {
    id: 12,
    subject: "Physics",
    topicCategory: "Electromagnetism & Solid-State Physics",
    title: "The Principles of Solar Energy",
    sentences: [
      "Photovoltaic energy conversion relies upon the inherent quantum mechanical properties of semiconductor materials, most commonly crystalline silicon.",
      "Silicon wafers are deliberately doped with trace impurity elements to create an asymmetric internal electric field across a p-n junction.",
      "When incident solar photons with energy exceeding the semiconductor's bandgap strike the silicon, they dislodge bound electrons from their valence states.",
      "The built-in electric field at the junction immediately segregates these freed electrons, preventing instantaneous recombination with corresponding holes.",
      "This directional movement of liberated charge carriers toward metallic surface electrodes generates an external direct electric current."
    ],
    question: "Which sentence identifies the specific physical event that frees electrons from their atomic valence states within a solar cell?",
    correctAnswerIndex: 2, // C
    correctSentence: "When incident solar photons with energy exceeding the semiconductor's bandgap strike the silicon, they dislodge bound electrons from their valence states.",
    explanation: "Sentence [C] specifically identifies the triggering physical event: incoming solar photons with energy greater than the semiconductor bandgap colliding with silicon to dislodge bound electrons.",
    distractorExplanations: {
      0: "Sentence [A] introduces photovoltaic conversion and semiconductor materials in broad terms.",
      1: "Sentence [B] explains chemical doping to construct a p-n junction and establish an internal field.",
      3: "Sentence [D] describes how the internal field separates electrons from holes after they have already been dislodged.",
      4: "Sentence [E] explains the directional flow toward metal contacts that forms the electric current."
    }
  },

  // 13. Anthropology — Early Human Migration
  {
    id: 13,
    subject: "Anthropology",
    topicCategory: "Human Origins & Paleoanthropology",
    title: "Early Human Migration",
    sentences: [
      "Fossil discoveries and genetic sequencing confirm that anatomically modern Homo sapiens emerged in Africa approximately three hundred thousand years ago.",
      "For millennia, harsh climatic fluctuations and geographical barriers restricted early human bands to localized geographic refuges within the continent.",
      "Around sixty to seventy thousand years ago, enduring environmental shifts produced wetter savanna corridors across Northeast Africa and the Arabian Peninsula.",
      "These ecological pathways enabled small founder populations to expand outward into Eurasia, following migratory herds of grazing herbivores.",
      "As they entered novel biomes, human populations adapted rapidly to extreme environmental pressures, including subarctic permafrost and humid jungles."
    ],
    question: "Which sentence identifies the environmental change that permitted early human populations to cross the geographic barrier out of Africa?",
    correctAnswerIndex: 2, // C
    correctSentence: "Around sixty to seventy thousand years ago, enduring environmental shifts produced wetter savanna corridors across Northeast Africa and the Arabian Peninsula.",
    explanation: "Sentence [C] directly names the environmental trigger: long-term climatic shifts that created wetter savanna corridors across Northeast Africa and Arabia, opening a route out of the continent.",
    distractorExplanations: {
      0: "Sentence [A] states the approximate date and geographic origin of Homo sapiens in Africa based on genetics and fossils.",
      1: "Sentence [B] explains how prior climatic barriers confined human groups within Africa.",
      3: "Sentence [D] describes human groups expanding and tracking game herds once the corridors were already established.",
      4: "Sentence [E] highlights physiological and technological adaptations to distinct global ecosystems."
    }
  },

  // 14. Agriculture — Sustainable Farming Practices
  {
    id: 14,
    subject: "Agriculture",
    topicCategory: "Agronomy & Sustainable Food Systems",
    title: "Sustainable Farming Practices",
    sentences: [
      "Industrial agricultural systems depend heavily on synthetic nitrogenous fertilizers, prophylactic chemical pesticides, and mechanized monoculture regimes.",
      "While these intensive practices initially multiplied crop yields, they have triggered widespread aquifer contamination and accelerated soil compaction.",
      "In response, agroecologists advocate for regenerative farming strategies that imitate the self-regulating mechanisms of natural ecosystems.",
      "Planting multi-species cover crops during fallow seasons shields bare earth from kinetic wind erosion and systematically enriches soil biological activity.",
      "Furthermore, incorporating leguminous plants into crop rotation schedules naturally fixes atmospheric nitrogen through root nodule bacteria, decreasing dependence on petroleum-based fertilizers."
    ],
    question: "Which sentence explains how incorporating leguminous crops into rotational cycles diminishes the requirement for commercial fertilizers?",
    correctAnswerIndex: 4, // E
    correctSentence: "Furthermore, incorporating leguminous plants into crop rotation schedules naturally fixes atmospheric nitrogen through root nodule bacteria, decreasing dependence on petroleum-based fertilizers.",
    explanation: "Sentence [E] explicitly answers the question by describing biological nitrogen fixation through symbiotic root nodule bacteria in legumes, which replaces commercial synthetic fertilizers.",
    distractorExplanations: {
      0: "Sentence [A] outlines the foundational components of conventional industrial farming.",
      1: "Sentence [B] details environmental damage (aquifer pollution and soil compaction) caused by industrial methods.",
      2: "Sentence [C] introduces regenerative agriculture and its mimicry of natural ecosystems.",
      3: "Sentence [D] describes cover crops preventing wind erosion and enhancing biological activity, not nitrogen fixation."
    }
  },

  // 15. Chemistry — Chemical Reactions in Everyday Life
  {
    id: 15,
    subject: "Chemistry",
    topicCategory: "Chemical Kinetics & Thermodynamics",
    title: "Chemical Reactions in Everyday Life",
    sentences: [
      "Spontaneous and non-spontaneous chemical transformations occur incessantly in ambient environments, driving both natural and engineered phenomena.",
      "One familiar spontaneous oxidative process is the corrosion of iron, commonly recognized as the formation of reddish-brown rust.",
      "Rusting requires both dissolved oxygen and ambient moisture to act as electron acceptors and electrolytic transport mediums on metallic surfaces.",
      "When iron atoms contact water containing dissolved oxygen, they surrender valence electrons, oxidizing into ferrous cations that subsequently precipitate as hydrated iron oxides.",
      "This progressive chemical oxidation compromises the structural integrity of steel infrastructure, necessitating substantial expenditures on sacrificial zinc coatings."
    ],
    question: "Which sentence describes the atomic-level transformation that occurs when iron begins to oxidize in the presence of water and oxygen?",
    correctAnswerIndex: 3, // D
    correctSentence: "When iron atoms contact water containing dissolved oxygen, they surrender valence electrons, oxidizing into ferrous cations that subsequently precipitate as hydrated iron oxides.",
    explanation: "Sentence [D] describes the specific atomic reaction: iron atoms surrendering valence electrons to become ferrous cations, which then precipitate as hydrated iron oxide.",
    distractorExplanations: {
      0: "Sentence [A] introduces chemical transformations occurring in daily life in broad terms.",
      1: "Sentence [B] introduces rusting as an everyday oxidative process without describing atomic changes.",
      2: "Sentence [C] lists the necessary environmental conditions (dissolved oxygen and moisture acting as electrolytes).",
      4: "Sentence [E] describes structural damage to steel structures and commercial remedies."
    }
  },

  // 16. Sociology — Urbanization and Social Change
  {
    id: 16,
    subject: "Sociology",
    topicCategory: "Urban Sociology",
    title: "Urbanization and Social Change",
    sentences: [
      "The rapid consolidation of human populations into dense metropolitan centers represents one of the defining social transitions of modernity.",
      "Sociologists noted that the migration from agrarian villages to industrial cities fundamentally altered the structure of human interpersonal networks.",
      "In traditional rural communities, social cohesion rested largely upon kinship bonds, shared ancestral traditions, and pervasive direct surveillance.",
      "Urban environments, however, engender secondary social relationships characterized by functional impersonality, behavioral anonymity, and transactional reciprocity.",
      "While this urban detachment can generate intense feelings of alienation, it also liberates individuals from oppressive communal conformism."
    ],
    question: "Which sentence identifies the specific characteristics that distinguish interpersonal relationships in urban settings from those in traditional rural areas?",
    correctAnswerIndex: 3, // D
    correctSentence: "Urban environments, however, engender secondary social relationships characterized by functional impersonality, behavioral anonymity, and transactional reciprocity.",
    explanation: "Sentence [D] directly defines the distinguishing characteristics of urban relationships: functional impersonality, behavioral anonymity, and transactional reciprocity.",
    distractorExplanations: {
      0: "Sentence [A] introduces urbanization as a defining modern sociological transition.",
      1: "Sentence [B] notes generally that migration from villages to cities transformed interpersonal networks.",
      2: "Sentence [C] describes rural relationships (kinship, shared traditions, direct surveillance) rather than urban characteristics.",
      4: "Sentence [E] discusses psychological trade-offs (alienation versus liberation from conformity)."
    }
  },

  // 17. Geology — The Formation of Volcanic Islands
  {
    id: 17,
    subject: "Geology",
    topicCategory: "Volcanology & Plate Tectonics",
    title: "The Formation of Volcanic Islands",
    sentences: [
      "While most planetary volcanic activity clusters along tectonic plate boundaries, several notable island archipelagos originate far from plate margins.",
      "These intraplate volcanic chains are generated by mantle plumes, which are stationary columns of exceptionally hot rock ascending from the core-mantle boundary.",
      "As a mantle plume approaches the lithosphere, decompression melting produces colossal volumes of basaltic magma that rupture through oceanic crust.",
      "Over millions of years, successive submarine lava eruptions accumulate layer upon layer until the growing volcanic edifice breaches the ocean surface to form a volcanic island.",
      "Because the oceanic tectonic plate steadily glides over the fixed subterranean plume, the active eruptive center eventually moves, leaving older extinct volcanoes in its wake."
    ],
    question: "Which sentence explains how successive underwater eruptions eventually produce an island above sea level?",
    correctAnswerIndex: 3, // D
    correctSentence: "Over millions of years, successive submarine lava eruptions accumulate layer upon layer until the growing volcanic edifice breaches the ocean surface to form a volcanic island.",
    explanation: "Sentence [D] directly describes the vertical accumulation process: submarine lava flows building layer upon layer until the summit breaks the ocean's surface to become an island.",
    distractorExplanations: {
      0: "Sentence [A] introduces intraplate volcanic archipelagos located away from plate boundaries.",
      1: "Sentence [B] defines mantle plumes ascending from the deep core-mantle boundary.",
      2: "Sentence [C] explains decompression melting producing basaltic magma beneath the crust.",
      4: "Sentence [E] explains how plate movement shifts the eruptive center away, creating a chain of extinct cones."
    }
  },

  // 18. Linguistics — The Evolution of Human Language
  {
    id: 18,
    subject: "Linguistics",
    topicCategory: "Historical Linguistics & Phonology",
    title: "The Evolution of Human Language",
    sentences: [
      "All living spoken languages are dynamic symbolic systems that undergo continuous phonological, grammatical, and lexical evolution over generational timeframes.",
      "Historical linguists utilize the comparative method to reconstruct ancestral proto-languages by systematically analyzing regular sound correspondences across modern descendants.",
      "When speech communities become geographically or socially segregated, shared linguistic habits gradually drift apart due to localized innovations.",
      "Phonetic shifts frequently follow the principle of least effort, wherein vocal articulators subconsciously simplify complex consonant clusters and vowel transitions to conserve physical energy.",
      "Grammatical structures concurrently undergo grammaticalization, a process whereby autonomous lexical words slowly degrade into bound functional markers."
    ],
    question: "Which sentence explains how the physiological principle of least effort drives phonetic changes in speech over time?",
    correctAnswerIndex: 3, // D
    correctSentence: "Phonetic shifts frequently follow the principle of least effort, wherein vocal articulators subconsciously simplify complex consonant clusters and vowel transitions to conserve physical energy.",
    explanation: "Sentence [D] explicitly describes the principle of least effort in phonetics: vocal organs subconsciously simplifying difficult consonant clusters and vowels to conserve physical energy.",
    distractorExplanations: {
      0: "Sentence [A] states that languages continuously evolve across phonology, syntax, and vocabulary.",
      1: "Sentence [B] discusses the comparative method used to reconstruct ancestral proto-languages.",
      2: "Sentence [C] explains dialect divergence resulting from geographic or social separation.",
      4: "Sentence [E] describes grammaticalization (content words turning into grammatical markers) rather than phonetic shifts."
    }
  },

  // 19. Climate Science — Ocean Currents and Global Climate
  {
    id: 19,
    subject: "Climate Science",
    topicCategory: "Atmospheric & Ocean Dynamics",
    title: "Ocean Currents and Global Climate",
    sentences: [
      "The oceans absorb more than ninety percent of the surplus solar heat trapped within the Earth system by greenhouse gas accumulation.",
      "To redistribute this enormous thermal load, the planetary ocean operates a planetary-scale conveyor system known as the Atlantic Meridional Overturning Circulation (AMOC).",
      "Warm, saline surface waters originating in tropical latitudes are propelled northward by persistent atmospheric winds and Coriolis deflection.",
      "As these tropical waters traverse the North Atlantic toward polar latitudes, they surrender immense thermal energy to the atmosphere, moderating Western European winters.",
      "Upon cooling, the remaining surface water becomes exceptionally dense due to low temperature and elevated salinity, sinking into the deep abyss of the ocean."
    ],
    question: "Which sentence explains why cooled polar surface waters sink into the ocean abyss to drive deep oceanic circulation?",
    correctAnswerIndex: 4, // E
    correctSentence: "Upon cooling, the remaining surface water becomes exceptionally dense due to low temperature and elevated salinity, sinking into the deep abyss of the ocean.",
    explanation: "Sentence [E] directly provides the physical cause of deep water formation: lower temperature combined with high salinity makes the water exceptionally dense, forcing it to sink.",
    distractorExplanations: {
      0: "Sentence [A] details ocean heat absorption from atmospheric greenhouse gases.",
      1: "Sentence [B] introduces the Atlantic Meridional Overturning Circulation (AMOC) conveyor system.",
      2: "Sentence [C] describes how wind and Coriolis force transport warm water northward.",
      3: "Sentence [D] explains how heat release to the atmosphere warms Western European winters."
    }
  },

  // 20. Neuroscience — How the Brain Processes Information
  {
    id: 20,
    subject: "Neuroscience",
    topicCategory: "Sensory Systems & Neurobiology",
    title: "How the Brain Processes Information",
    sentences: [
      "The mammalian brain interprets complex sensory reality through the coordinated activity of roughly eighty-six billion interconnected neurons.",
      "When external sensory stimuli interact with peripheral receptor cells, environmental energy is transduced into rapid electrochemical fluctuations called action potentials.",
      "These all-or-nothing electrical impulses propagate along axonal pathways until reaching terminal synapses, where voltage-gated channels trigger neurotransmitter secretion.",
      "Individual cortical neurons integrate thousands of these competing excitatory and inhibitory inputs simultaneously across their dendritic trees.",
      "Only when the net summation of membrane voltages surpasses a critical axon hillock threshold does the neuron fire its own distinct output signal."
    ],
    question: "Which sentence specifies the exact condition under which a post-synaptic neuron will fire its own action potential?",
    correctAnswerIndex: 4, // E
    correctSentence: "Only when the net summation of membrane voltages surpasses a critical axon hillock threshold does the neuron fire its own distinct output signal.",
    explanation: "Sentence [E] explicitly identifies the threshold condition: the neuron will fire its own output signal only when the net summation of incoming voltages exceeds the critical threshold at the axon hillock.",
    distractorExplanations: {
      0: "Sentence [A] provides an overview of the brain's 86 billion interconnected neurons.",
      1: "Sentence [B] describes initial sensory transduction from physical energy into action potentials.",
      2: "Sentence [C] details impulse propagation along axons and neurotransmitter release at synapses.",
      3: "Sentence [D] describes the continuous dendritic summation of multiple excitatory and inhibitory signals."
    }
  }
];
