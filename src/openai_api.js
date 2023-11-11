import OpenAI from 'openai'

const profession_list = ["Carpets/Rugs/Draperies/Linens/Tile (No Off Premises Installation/Repair/No Fine/Antique Rugs) - Retail","Chartered Accountant/Certified Auditor","Construction - Irrigation / Drainage / Sprinkler Systems (Commercial - No Fire Extinguishing)","Dance / Gymnastic / Martial Arts Schools","Furniture / Rug / Drapery Cleaning (On Customer's Premises)","Landscaping (No Pesticide/Herbicide Use)","Paving Contractor (Driveways/Parking Lots) - Residential","Carpentry, trim and millwork (No Wood Shop)","Bedding / Blanket / Quilt Making","Wood Products Maker (Cabinetry / Closets / Molding / Trim / Fixtures / Partitions)","Construction - Sidewalks","Real Estate Agent/Broker","Meeting and Event Planner","devTest","Retail - Convenience / Variety / Tobacco Store","IT Consultant","Candy & Confectionery - Retail","Heating and Air Conditioning Equipment Installation and Service - Commercial","Flooring and Ceiling Contractor","Photographer","Dentists","Repair Shop - Household Electronics/Appliances","Appraisers (No Auto Appraisers)","Psychologist","Stock Broker/Dealer / Security Broker/Dealer","Candy Maker","Yoga Instructors","Renovation Contractor - Residential (Singles/Semis/Townhouses)","Locksmith","Blankets / Quilts / Towels Manufacturing (No Infant Products)","Construction - Residential New (Singles / Semis)","Insurance Inspection Services","Renovation - Residential (Apartments/Condos)","Baked Goods / Pasta Manufacturing","Hearing Aid Services","Wholesale Cameras / Opticals Products (including Accessories)","Veterinarians (Including Veterinary Hospitals)","Heating / Air Conditioning Equipment Installation / Service - Residential","Mailing & Addressing Operations (no delivery / courier)","Luggage / Gifts, Arts & Crafts / Religious Products / Decorative & Ornament / Hobby & Handicraft Shop (incl Artists Supplies)  - Retail","Communication Equipment Installation - Residential","Landscaping (Including Pesticide/Herbicide Use)","Footwear Manufacturing","Musical Instruments (Sales/Repairs) - Retail","Fire Extinguishing Equipment Installation / Servicing (No automatic systems)","Swimming Pools - Installation / Repair","Animal Wellness Centre - Household Pets","Water Softening/Treatment Services (Sales, Service & Installation)","Solar Energy Contractor (Sales/Service/Installation)","Computer Manufacturing (including Refurbishing)","Shoes/Boots - Retail","Window & Eavestrough Cleaning - Low Rise Only (3 stories or less)","Dermatologists","Licensed Land Surveyor (no Geopolitical Mapping/Surveying)","Exterior Building Cleaning, including pressure washing (no Sandblasting)","Currency Exchange - Retail","Insurance Adjuster Insurance Broker/Agent","Decorative Natural Stone Product Manufacturer / Natural Stone Product Sales (Wholesale & Retail)","Commercial Refrigeration Equipment Services (Sales, Service, Installation)","Household Moving / Packing Operations","Building Materials/Home Improvement Centres (including Lumber) - Retail","Human Resource Consultants","Court Reporters & Transcription Services","Tree Removal, Stump Removal","Certified Gas Fitter (Non-Medical)","Paving Contractor (Driveways/Parking Lots) - Commercial","Opticians","Housewares and Cutlery Manufacturing","Construction - Irrigation / Drainage / Sprinkler Systems (Underground - Residential - No Fire Extinguishing)","Collection Agency (Call Centre)","Dental Laboratories / Denturists","Travel Accessories / Luggage Wholesaler","Heating/Air Conditioning/Refrigeration Equipment (No Oil Heating) - Wholesale","Virtual Assistants/Administrative Assistants","Carpentry (incl. Wood Shop Operations)","Social Workers","Drywall / Plastering / Acoustical","Bookkeeping Services","Auto Specialty Shops (Auto Detail / Glass / Lube)","Career Consultant","Men's & Women's Clothing - Retail (No Manufacturing)","Beauty / Barber Supply Wholesaler","Paint/Wallpaper Application (including interior spray application)","Renovation - Commercial (Low Rise - 3 stories or less)","Beverage Manufacturing (Non-Alcoholic)","Masonry Contractor (Brick/Stone/Stuccoing)","Kennels / Boarding of Household Pets","Cleaning of parking lots/laneways","Chiropractors","Construction - Concrete Foundations and Forming (low rise - 3 stories or less)","Registered Nurses","Clothing Accessory Manufacturing","Underground Cable / Conduit Installer","Hardware (No Work Off Premises/No Firearms/No Ammunition/No  Explosives) - Retail","Paint/Wallpaper (No Work Off Premises) - Retail","Cosmetics Wholesaler","Plastic Sign Making","Gifts & Decorative Items - Retail","Cleaning of Sewers / Drains (Commercial)","Excavation","Wood/Metal Sign Making","Beverages (Non-Alcoholic) - Wholesale","Produce (Fruits/Vegetables) - Wholesale","Organizational Consultant","Licensed Architects","Glazier Operations (low rise - 3 stories or less)","Clothing Alteration - Retail","Textiles - Wholesale","Cleaning of Sewers / Drains (Residential)","Retail Auto Parts / accessories (no installation work)","Software Developer (Pre-Packaged Only)","Medical Radiation Technologist","Liquor, Beer & Wine - Retail","Mortgage Broker/Loan Correspondent","Chimney Sweeping","Technology Customer Support Service (For Others)","Duct/HVAC Sheet Metal Installation / Metal Siding Installation (Residential)","Light Fixture/Lamp Manufacturing","Floor Coverings (No Rugs/Carpets) - Wholesale","Baked Goods/Pasta - Retail","Swimming Pool Supplies/Accessories - Retail","Auto Appraisal Services","Electronic Shop (incl In-home & Offsite Services)","Psychiatrists","Garden Centre - Retail","Lawyers / Barristers / Solicitors","Ice Cream / Gelato / Yogurt  Store (no mobile operations)","Pet Store","Specialty Food Store","Retail - Country General Stores","Photography Developing & Printing Services","Dog Walkers","Family & Children's Clothing - Retail","Tiling Contractor (No Masonry)","Physician & Surgeon Office (Non-specialist)","Luggage / Gifts, Arts & Crafts / Religious Products / Decorative & Ornament / Hobby & Handicraft Products (incl Artists Supplies) - Wholesale","Answering Service (Non-Medical & No Dispatch)","Dairy Products/Eggs/Honey Manufacturing/Processing (Including Creameries)","Interior Designers","Stationery Maker / Creator (including binding)","Sign Rental/Lease","Dry & Canned Goods (No Dietary/Health Supplements) - Wholesale","Appliances (Electrical) - Wholesale","Marble/Decorative Stone/Clay - Wholesale","Women's Clothing (No Children's/No Fur) - Wholesale","Veterinarians (No Veterinary Hospitals)","Cleaning / Janitorial Service (Commercial)","Shoe/Boot/Hat Repair & Cleaning - Retail","Pet Food & Accessories (No Live Animals) - Retail","Camera & Photography Supply Store","Grocery Store / Farmers Market Vendor","Furniture/Appliances (Including Off-Premises Installation/Repair) - Retail","Project Manager (Non-Construction)","Marine Supply Store (no installation, repairs or rental)","Graphic Design (No Web Design)","Respiratory Technologist","Psychotherapist","Electrical Contractors - Commercial (No Industrial)","Handyman / Handywoman / Miscellaneous Home Repair","Nurses - Licensed Practical Nurse (L.P.N., R.P.N., R.N.A.)","Clock Maker","Paint/Wallpaper Application (no spray application)","Plumber - Residential","Electrical Contractors - Residential","Art or Music Therapist","Car Wash (Drive Through)","Auto Repair Garage (No Heavy Trucks)","Draperies - Wholesale","Nurses - Nurse Practitioner (N.P.)","Brick, Pottery, Clay Decorative Items Manufacturing","Electronics (Including Personal Computers) - Wholesale","Signs Installation - Low Rise (3 stories or less)","Home Stager (excluding Interior Design)","Marketing Consultant","Carpets/Rugs/Draperies/Linens/Tile (Includes Installation/Repair Off Premises, No Fine/Antique Rugs) - Retail","Men's Clothing (No Children's/No Fur) - Wholesale","Coffee Roaster / Tea & Spice Production","Pet Food & Supplies Manufacturing","Burglar / Fire Alarm Installation (No Monitoring)","Light Farm/Garden/Lawn Equipment & Supplies - Wholesale","Shoes/Boots - Wholesale","Certified Engineer","Furniture/Appliances - Retail","Travel Agencies","Educational Tutor/ Music Teacher (Sole Proprietor)","Cleaning / Housekeeping Service (Residential)","Clothing (Men's, no Children's) - Retail","Air Duct Cleaning","Commodity Brokers / Dealers","Decorative Items - Wholesale","Piano Tuning","Music/Sound Recording Studio","Equipment for Restaurants/Bars/Hotels/Offices/Stores - Wholesale","Beer / Wine Stores (Brew Your Own) Store","Meat/Fish/Poultry - Wholesale","Coffee Shop/Restaurants (No liquor)","Septic Tanks (Installation/Service/Repair)","Blinds / Drape / Curtain Manufacturing","Window/Door/Siding Contractor","Advertising Agency","Notary Public (Non-lawyer)","Restaurants - Take Out/Delivery (No Table Service)","Retail - Audio / Video Media Sales / Rentals (Music / Movies / Etc)","Retail - Sporting Goods (No Firearms / Ammunition)","Personal Support Worker (PSW)","Web Design","Men's & Women's Clothing Manufacturing","Dry Cleaning (Customer Drop-Off Only)","Iron / Steel Non-Structural (including Railings)","Swimming Pool Maintenance","Pet Sitter - Household Pets","Broom / Brushes / Mops Manufacturing","Small Batch Soap Maker","Musical Instruments - Wholesale","Hardware/Plumbing Supplies/Electrical Supplies - Wholesale","Housewares - Retail","Restaurants (Food Court)","Kinesiologists","Physician & Surgeon Office (Including Specialist)","Occupational Therapists","Auto Specialty Shops (Mufflers / Transmissions / Radiators)","Dieticians","Glass/Pottery/Ceramic Product Manufacturing (No Windows)","Light Garden/Lawn Equipment - Retail","Linen/Towel/Diaper/Uniform Supply","Registered Massage Therapists","Financial Planners / Advisors","China/Glass/Earthenware - Wholesale","Catering/Caterer/Chef (Personal/Private) (No Liquor Serving)","Butcher Shop","Retail - Drug Stores","Floor Coverings (Rugs/Carpets) - Wholesale","Accessories (Hats/Scarves/Belts) - Retail","Poster Art, Framing & Laminating - Retail","Electronic Shop","Books & Stationery - Retail","Non-Motorized Bicycles (Including Repair) - Retail","Copywriters","Freight Brokers","Spray Painting (Exterior)","Pet Groomer - Household Pets","Beauty Salons and Barber Shops (Hairstyling / Manicures / Pedicures Only, No Estheticians)","Pet Daycare - Household Pets","Pet Trainer - Household Pets","Optometrists","Dental Hygienists","Speech Therapists","Call Centres - No Dispatch","Arbitrators/Mediators","Restaurant Exhaust Maintenance & Cleaning","Strategic Consultant","Operations Consultant","Physiotherapists","Canning and preserving fruit and vegetables","Copying & Stationary Store","Grading Contractor","Construction - Fences / Decks","Management Consultant","Candle Maker / Furniture Polish / Other Wax Products","Residential Well Digging/Drilling","Business Incubator","Glass Ornaments, Stemware and Articles Manufacturer (No Windows)","Ice Dealers","Ophthalmologists","Frozen Foods Store","Newspapers/Periodicals/Books - Wholesale","Office Machines (Not Including Computers) - Wholesale"];

const schema = {
    type: "object",
    properties: {
        profession_1: {
            description: `Information of the most likely profession`,
            type: "object",
            properties: {
                profession_name: {
                    description: `Full name of the profession`,
                    type: "string",
                    enum: profession_list
                },
                probability: {
                    description: "the possibility of the guess",
                    type: "number"       
                },
                classification: {
                    description: "profession classification",
                    type: "string",
                    enum: ['CONTRACTING', 'PROFESSIONAL_SERVICES', 'RETAIL', 'OTHERS']
                }
            },
            required:["profession_name", "probability", 'classification']  
        },
        profession_2: {
            description: `Information of the second most likely profession`,
            type: "object",
            properties: {
                profession_name: {
                    description: `Full name of the profession`,
                    type: "string",
                    enum: profession_list    
                },
                probability: {
                    description: "the possibility of the guess",
                    type: "number"       
                },
                classification: {
                    description: "profession classification",
                    type: "string",
                    enum: ['CONTRACTING', 'PROFESSIONAL_SERVICES', 'RETAIL', 'Others']
                }
            },
            required:["profession_name", "probability", 'classification']
        },
    },
    required: ["profession_1", "profession_2"]
}


function getOpenAIConnection() {
    // const configuration = new OpenAI({
    //     organization: 'org-euWvNNFFyodNWZA86qKBaHHi',
    //     apiKey: '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',
    // });

    const configuration = new OpenAI({
        organization: process.env.OPEN_AI_ORGANIZATION,
        apiKey: process.env.OPEN_AI_API_KEY,
    });
    
    const openai = new OpenAI(configuration);
    return openai
}

export const getMatchedProfessionsFromOpenAI = async (message) => {
    let matchedProfessionsObj = {};

    try {
        const openai = getOpenAIConnection();
        const {data, response } = await openai.chat.completions.create({
            model: 'gpt-4',
            // model: 'gpt-3.5-turbo',
            // model: "ft:gpt-3.5-turbo-1106:tianxing-li::8JVZjEai",
            temperature: 0.7,
            // max_tokens: 2000,
            messages: [
                {role: 'user', content: `Given the job description in []: [${message}], guess the full names of the two most matched professions and provide more information about them , including at least the name and classification of the matched professions and the probabilities that they are the match.`},
            
            ],
            functions: [
                {name: "get_profession_data", "parameters": schema}
            ],
            function_call: {name: "get_profession_data"},
        }).withResponse();

        const profession_data = JSON.parse(data.choices[0].message.function_call.arguments);

        matchedProfessionsObj = {
            profession_1: {
                profession_name: profession_data.profession_1.profession_name,
                probability: profession_data.profession_1.probability,
                classification: profession_data.profession_1.classification,
            },
            profession_2: {
                profession_name: profession_data.profession_2.profession_name,
                probability: profession_data.profession_2.probability,
                classification: profession_data.profession_2.classification
            }
        };
    } catch (error) {
        console.error("Error in getMatchedProfessionsFromOpenAI:", error);
    }

    return matchedProfessionsObj;
}