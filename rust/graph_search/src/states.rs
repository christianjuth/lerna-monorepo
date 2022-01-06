use std::collections::HashMap;

pub const WASHINGTON: &str = "Washington";
pub const OREGON: &str = "Oregon";
pub const CALIFORNIA: &str = "California";
pub const IDAHO: &str = "Idaho";
pub const NEVADA: &str = "Nevada";
pub const ARIZONA: &str = "Arizona";
pub const UTAH: &str = "Utah";
pub const MONTANA: &str = "Montana";
pub const WYOMING: &str = "Wyoming";
pub const COLORADO: &str = "Colorado";
pub const NEW_MEXICO: &str = "New Mexico";
pub const NORTH_DAKOTA: &str = "North Dakota";
pub const SOUTH_DAKOTA: &str = "South Dakota";
pub const NEBRASKA: &str = "Nebraska";
pub const KANSAS: &str = "Kansas";
pub const OKLAHOMA: &str = "Oklahoma";
pub const TEXAS: &str = "Texas";
pub const MINNESOTA: &str = "Minnesota";
pub const IOWA: &str = "Iowa";
pub const MISSOURI: &str = "Missouri";
pub const ARKANSAS: &str = "Arkansas";
pub const LOUISIANA: &str = "Louisiana";
pub const WISCOUSIN: &str = "Wisconsin";
pub const ILLINOIS: &str = "Illinois";
pub const KENTUCKY: &str = "Kentucky";
pub const TENNESSEE: &str = "Tennessee";
pub const MISSISSIPPI: &str = "Mississippi";
pub const MICHIGAN: &str = "Michigan";
pub const INDIANA: &str = "Indiana";
pub const ALABAMA: &str = "Alabama";
pub const OHIO: &str = "Ohio";
pub const GEORGIA: &str = "Georgia";
pub const FLORIDA: &str = "Florida";
pub const NEW_YORK: &str = "New York";
pub const PENNSYLVANIA: &str = "Pennsylvania";
pub const WEST_VIRGINIA: &str = "West Virginia";
pub const VIRGINIA: &str = "Virginia";
pub const NORTH_CAROLINA: &str = "North Carolina";
pub const SOUTH_CAROLINA: &str = "South Carolina";
pub const VERMONT: &str = "Vermont";
pub const MASSACHUSETTS: &str = "Massachusetts";
pub const RHODE_ISLAND: &str = "Rhode Island";
pub const CONNECTICUT: &str = "Connecticut";
pub const NEW_JERSEY: &str = "New Jersey";
pub const DELAWARE: &str = "Delaware";
pub const MARYLAND: &str = "Maryland";
pub const NEW_HAMPSHIRE: &str = "New Hampshire";
pub const MAINE: &str = "Maine";
pub const ALASKA: &str = "Alaska";
pub const HAWAII: &str = "Hawaii";

pub fn get_edges<'a>() -> HashMap<&'a str, Vec<&'a str>> {
    let mut edges = HashMap::new();

    edges.insert(WASHINGTON, vec![OREGON, IDAHO]);

    edges.insert(OREGON, vec![WASHINGTON, IDAHO, NEVADA, CALIFORNIA]);

    edges.insert(CALIFORNIA, vec![NEVADA, ARIZONA, OREGON]);

    edges.insert(
        IDAHO,
        vec![WASHINGTON, OREGON, MONTANA, WYOMING, UTAH, NEVADA],
    );

    edges.insert(NEVADA, vec![OREGON, CALIFORNIA, IDAHO, UTAH, ARIZONA]);

    edges.insert(ARIZONA, vec![CALIFORNIA, NEVADA, UTAH, NEW_MEXICO]);

    edges.insert(UTAH, vec![IDAHO, WYOMING, NEVADA, ARIZONA, COLORADO]);

    edges.insert(MONTANA, vec![IDAHO, NORTH_DAKOTA, SOUTH_DAKOTA, WYOMING]);

    edges.insert(
        WYOMING,
        vec![MONTANA, IDAHO, UTAH, COLORADO, NEBRASKA, SOUTH_DAKOTA],
    );

    edges.insert(
        COLORADO,
        vec![WYOMING, UTAH, NEBRASKA, KANSAS, OKLAHOMA, NEW_MEXICO],
    );

    edges.insert(NEW_MEXICO, vec![ARIZONA, COLORADO, TEXAS, OKLAHOMA]);

    edges.insert(NORTH_DAKOTA, vec![MONTANA, SOUTH_DAKOTA, MINNESOTA]);

    edges.insert(
        SOUTH_DAKOTA,
        vec![NORTH_DAKOTA, MONTANA, WYOMING, NEBRASKA, MINNESOTA, IOWA],
    );

    edges.insert(
        NEBRASKA,
        vec![SOUTH_DAKOTA, WYOMING, COLORADO, KANSAS, IOWA, MISSOURI],
    );

    edges.insert(KANSAS, vec![NEBRASKA, COLORADO, OKLAHOMA, MISSOURI]);

    edges.insert(
        OKLAHOMA,
        vec![KANSAS, COLORADO, NEW_MEXICO, TEXAS, MISSOURI, ARKANSAS],
    );

    edges.insert(TEXAS, vec![NEW_MEXICO, OKLAHOMA, ARKANSAS, LOUISIANA]);

    edges.insert(MINNESOTA, vec![NORTH_DAKOTA, SOUTH_DAKOTA, IOWA, WISCOUSIN]);

    edges.insert(
        IOWA,
        vec![
            MINNESOTA,
            SOUTH_DAKOTA,
            NEBRASKA,
            MISSOURI,
            ILLINOIS,
            WISCOUSIN,
        ],
    );

    edges.insert(
        MISSOURI,
        vec![
            IOWA, ILLINOIS, KENTUCKY, TENNESSEE, ARKANSAS, OKLAHOMA, KANSAS, NEBRASKA,
        ],
    );

    edges.insert(
        ARKANSAS,
        vec![MISSOURI, OKLAHOMA, TEXAS, LOUISIANA, MISSISSIPPI, TENNESSEE],
    );

    edges.insert(LOUISIANA, vec![TEXAS, ARKANSAS, MISSISSIPPI]);

    edges.insert(WISCOUSIN, vec![MICHIGAN, MINNESOTA, IOWA, ILLINOIS]);

    edges.insert(
        KENTUCKY,
        vec![
            ILLINOIS,
            INDIANA,
            OHIO,
            WEST_VIRGINIA,
            VIRGINIA,
            TENNESSEE,
            MISSOURI,
        ],
    );

    edges.insert(
        TENNESSEE,
        vec![
            MISSOURI,
            ARKANSAS,
            MISSISSIPPI,
            ALABAMA,
            GEORGIA,
            NORTH_CAROLINA,
            VIRGINIA,
            KENTUCKY,
        ],
    );

    edges.insert(MISSISSIPPI, vec![ARKANSAS, LOUISIANA, TENNESSEE, ALABAMA]);

    edges.insert(MICHIGAN, vec![WISCOUSIN, INDIANA, OHIO]);

    edges.insert(INDIANA, vec![MICHIGAN, ILLINOIS, KENTUCKY, OHIO]);

    edges.insert(ALABAMA, vec![TENNESSEE, MISSISSIPPI, GEORGIA, FLORIDA]);

    edges.insert(
        OHIO,
        vec![MICHIGAN, INDIANA, KENTUCKY, WEST_VIRGINIA, PENNSYLVANIA],
    );

    edges.insert(
        GEORGIA,
        vec![TENNESSEE, NORTH_CAROLINA, SOUTH_CAROLINA, FLORIDA, ALABAMA],
    );

    edges.insert(FLORIDA, vec![ALABAMA, GEORGIA]);

    edges.insert(
        NEW_YORK,
        vec![
            PENNSYLVANIA,
            NEW_JERSEY,
            MASSACHUSETTS,
            VERMONT,
            CONNECTICUT,
        ],
    );

    edges.insert(
        PENNSYLVANIA,
        vec![
            NEW_YORK,
            OHIO,
            WEST_VIRGINIA,
            MARYLAND,
            DELAWARE,
            NEW_JERSEY,
        ],
    );

    edges.insert(
        WEST_VIRGINIA,
        vec![OHIO, PENNSYLVANIA, MARYLAND, VIRGINIA, KENTUCKY],
    );

    edges.insert(
        VIRGINIA,
        vec![WEST_VIRGINIA, MARYLAND, NORTH_CAROLINA, TENNESSEE, KENTUCKY],
    );

    edges.insert(
        NORTH_CAROLINA,
        vec![VIRGINIA, TENNESSEE, SOUTH_CAROLINA, GEORGIA],
    );

    edges.insert(SOUTH_CAROLINA, vec![NORTH_CAROLINA, GEORGIA]);

    edges.insert(VERMONT, vec![NEW_YORK, NEW_HAMPSHIRE, RHODE_ISLAND]);

    edges.insert(
        MASSACHUSETTS,
        vec![VERMONT, NEW_YORK, NEW_HAMPSHIRE, RHODE_ISLAND, CONNECTICUT],
    );

    edges.insert(RHODE_ISLAND, vec![MASSACHUSETTS, CONNECTICUT]);

    edges.insert(CONNECTICUT, vec![MASSACHUSETTS, RHODE_ISLAND, NEW_YORK]);

    edges.insert(NEW_JERSEY, vec![NEW_YORK, PENNSYLVANIA, DELAWARE]);

    edges.insert(DELAWARE, vec![NEW_JERSEY, PENNSYLVANIA, MARYLAND]);

    edges.insert(
        MARYLAND,
        vec![PENNSYLVANIA, WEST_VIRGINIA, VIRGINIA, DELAWARE],
    );

    edges.insert(NEW_HAMPSHIRE, vec![VERMONT, MAINE, RHODE_ISLAND]);

    edges.insert(MAINE, vec![NEW_HAMPSHIRE]);

    edges.insert(ALASKA, vec![]);

    edges.insert(HAWAII, vec![]);

    edges
}

pub fn get_state<'a>(name: &String) -> Option<&'a str> {
    let name = name.clone().trim().to_lowercase();

    match &name[..] {
        "washington" => Some(WASHINGTON),
        "oregon" => Some(OREGON),
        "california" => Some(CALIFORNIA),
        "idaho" => Some(IDAHO),
        "nevada" => Some(NEVADA),
        "arizona" => Some(ARIZONA),
        "utah" => Some(UTAH),
        "montana" => Some(MONTANA),
        "wyoming" => Some(WYOMING),
        "colorado" => Some(COLORADO),
        "new mexico" => Some(NEW_MEXICO),
        "north dakota" => Some(NORTH_DAKOTA),
        "south dakota" => Some(SOUTH_DAKOTA),
        "nebraska" => Some(NEBRASKA),
        "kansas" => Some(KANSAS),
        "oklahoma" => Some(OKLAHOMA),
        "texas" => Some(TEXAS),
        "minnesota" => Some(MINNESOTA),
        "iowa" => Some(IOWA),
        "missouri" => Some(MISSOURI),
        "arkansas" => Some(ARKANSAS),
        "louisiana" => Some(LOUISIANA),
        "wisconsin" => Some(WISCOUSIN),
        "illinois" => Some(ILLINOIS),
        "kentucky" => Some(KENTUCKY),
        "tennessee" => Some(TENNESSEE),
        "mississippi" => Some(MISSISSIPPI),
        "michigan" => Some(MICHIGAN),
        "indiana" => Some(INDIANA),
        "alabama" => Some(ALABAMA),
        "ohio" => Some(OHIO),
        "georgia" => Some(GEORGIA),
        "florida" => Some(FLORIDA),
        "new york" => Some(NEW_YORK),
        "pennsylvania" => Some(PENNSYLVANIA),
        "west virginia" => Some(WEST_VIRGINIA),
        "virginia" => Some(VIRGINIA),
        "north carolina" => Some(NORTH_CAROLINA),
        "south carolina" => Some(SOUTH_CAROLINA),
        "vermont" => Some(VERMONT),
        "massachusetts" => Some(MASSACHUSETTS),
        "rhode island" => Some(RHODE_ISLAND),
        "connecticut" => Some(CONNECTICUT),
        "new jersey" => Some(NEW_JERSEY),
        "delaware" => Some(DELAWARE),
        "maryland" => Some(MARYLAND),
        "new hampshire" => Some(NEW_HAMPSHIRE),
        "maine" => Some(MAINE),
        "alaska" => Some(ALASKA),
        "hawaii" => Some(HAWAII),
        "wa" => Some(WASHINGTON),
        "or" => Some(OREGON),
        "ca" => Some(CALIFORNIA),
        "id" => Some(IDAHO),
        "nv" => Some(NEVADA),
        "az" => Some(ARIZONA),
        "ut" => Some(UTAH),
        "mt" => Some(MONTANA),
        "wy" => Some(WYOMING),
        "co" => Some(COLORADO),
        "nm" => Some(NEW_MEXICO),
        "nd" => Some(NORTH_DAKOTA),
        "sd" => Some(SOUTH_DAKOTA),
        "ne" => Some(NEBRASKA),
        "ks" => Some(KANSAS),
        "ok" => Some(OKLAHOMA),
        "tx" => Some(TEXAS),
        "mn" => Some(MINNESOTA),
        "ia" => Some(IOWA),
        "mo" => Some(MISSOURI),
        "ar" => Some(ARKANSAS),
        "la" => Some(LOUISIANA),
        "wi" => Some(WISCOUSIN),
        "il" => Some(ILLINOIS),
        "ky" => Some(KENTUCKY),
        "tn" => Some(TENNESSEE),
        "ms" => Some(MISSISSIPPI),
        "mi" => Some(MICHIGAN),
        "in" => Some(INDIANA),
        "al" => Some(ALABAMA),
        "oh" => Some(OHIO),
        "ga" => Some(GEORGIA),
        "fl" => Some(FLORIDA),
        "ny" => Some(NEW_YORK),
        "pa" => Some(PENNSYLVANIA),
        "wv" => Some(WEST_VIRGINIA),
        "va" => Some(VIRGINIA),
        "nc" => Some(NORTH_CAROLINA),
        "sc" => Some(SOUTH_CAROLINA),
        "vt" => Some(VERMONT),
        "ma" => Some(MASSACHUSETTS),
        "ri" => Some(RHODE_ISLAND),
        "ct" => Some(CONNECTICUT),
        "nj" => Some(NEW_JERSEY),
        "de" => Some(DELAWARE),
        "md" => Some(MARYLAND),
        "nh" => Some(NEW_HAMPSHIRE),
        "me" => Some(MAINE),
        "ak" => Some(ALASKA),
        "hi" => Some(HAWAII),
        _ => None,
    }
}
