package constants

func opposingStats() [][2]string {
	originalStats := []string{
		"fg", "fga", "fg_pct", "fg3", "fg3a", "fg3_pct", "fg2", "fg2a", "fg2_pct", "ft", "fta", "ft_pct",
		"orb", "drb", "trb", "ast", "stl", "blk", "tov", "pf", "pts",
	}
	shootingStats := []string{
		"avg_dist", "pct_fga_fg2a", "pct_fga_00_03", "pct_fga_03_10", "pct_fga_10_16", "pct_fga_16_xx",
		"pct_fga_fg3a", "fg_pct_00_03", "fg_pct_03_10", "fg_pct_10_16", "fg_pct_16_xx", "pct_ast_fg2",
		"pct_ast_fg3", "pct_fga_dunk", "fg_dunk", "fg_layup", "pct_fg3a_corner", "fg3_pct_corner",
	}
	var opposingStats [][2]string

	for _, field := range originalStats {
		opposingStats = append(opposingStats, [2]string{field, "opp_" + field})
		opposingStats = append(opposingStats, [2]string{"opp_" + field, field})
	}
	for _, field := range shootingStats {
		opposingStats = append(opposingStats, [2]string{field, "opp_" + field})
		opposingStats = append(opposingStats, [2]string{"opp_" + field, field})
	}
	extraStats := [][2]string{
		{"efg_pct", "opp_efg_pct"},
		{"tov_pct", "opp_tov_pct"},
		{"orb_pct", "drb_pct"},
		{"ft_rate", "opp_ft_rate"},
		{"opp_efg_pct", "efg_pct"},
		{"opp_tov_pct", "tov_pct"},
		{"drb_pct", "orb_pct"},
		{"opp_ft_rate", "ft_rate"},
	}

	opposingStats = append(opposingStats, extraStats...)

	return opposingStats
}