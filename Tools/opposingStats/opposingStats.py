def opposing_stats():
    original_stats = [
        "fg", "fga", "fg_pct", "fg3", "fg3a", "fg3_pct", "fg2", "fg2a", "fg2_pct", "ft", "fta", "ft_pct",
        "orb", "drb", "trb", "ast", "stl", "blk", "tov", "pf", "pts"
    ]
    shooting_stats = [
        "avg_dist", "pct_fga_fg2a", "pct_fga_00_03", "pct_fga_03_10", "pct_fga_10_16", "pct_fga_16_xx",
        "pct_fga_fg3a", "fg_pct_00_03", "fg_pct_03_10", "fg_pct_10_16", "fg_pct_16_xx", "pct_ast_fg2",
        "pct_ast_fg3", "pct_fga_dunk", "fg_dunk", "fg_layup", "pct_fg3a_corner", "fg3_pct_corner"
    ]

    opposing_stats = []

    for field in original_stats:
        opposing_stats.append([field, "opp_" + field])
        opposing_stats.append(["opp_" + field, field])
    
    for field in shooting_stats:
        opposing_stats.append([field, "opp_" + field])
        opposing_stats.append(["opp_" + field, field])
    
    extra_stats = [
        ["efg_pct", "opp_efg_pct"],
        ["tov_pct", "opp_tov_pct"],
        ["orb_pct", "drb_pct"],
        ["ft_rate", "opp_ft_rate"],
        ["opp_efg_pct", "efg_pct"],
        ["opp_tov_pct", "tov_pct"],
        ["drb_pct", "orb_pct"],
        ["opp_ft_rate", "ft_rate"]
    ]

    opposing_stats.extend(extra_stats)

    return opposing_stats

# Example usage
stats = opposing_stats()
for stat in stats:
    print(stat)