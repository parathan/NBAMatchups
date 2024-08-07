FEATURE_LIST = [
    "g_x", "mp_x", "fg_x", "fga_x", "fg_pct_x", "fg3_x", "fg3a_x", "fg3_pct_x", "fg2_x", "fg2a_x", "fg2_pct_x", 
    "ft_x", "fta_x", "ft_pct_x", "orb_x", "drb_x", "trb_x", "ast_x", "stl_x", "blk_x", "tov_x", "pf_x", "pts_x", 
    "opp_fg_x", "opp_fga_x", "opp_fg_pct_x", "opp_fg3_x", "opp_fg3a_x", "opp_fg3_pct_x", "opp_fg2_x", "opp_fg2a_x", 
    "opp_fg2_pct_x", "opp_ft_x", "opp_fta_x", "opp_ft_pct_x", "opp_orb_x", "opp_drb_x", "opp_trb_x", "opp_ast_x", 
    "opp_stl_x", "opp_blk_x", "opp_tov_x", "opp_pf_x", "opp_pts_x", "age_x", "wins_x", "losses_x", "wins_pyth_x", 
    "losses_pyth_x", "mov_x", "sos_x", "srs_x", "off_rtg_x", "def_rtg_x", "net_rtg_x", "pace_x", "fta_per_fga_pct_x", 
    "fg3a_per_fga_pct_x", "ts_pct_x", "efg_pct_x", "tov_pct_x", "orb_pct_x", "ft_rate_x", "opp_efg_pct_x", 
    "opp_tov_pct_x", "drb_pct_x", "opp_ft_rate_x", "avg_dist_x", "pct_fga_fg2a_x", "pct_fga_00_03_x", "pct_fga_03_10_x", 
    "pct_fga_10_16_x", "pct_fga_16_xx_x", "pct_fga_fg3a_x", "fg_pct_00_03_x", "fg_pct_03_10_x", "fg_pct_10_16_x", 
    "fg_pct_16_xx_x", "pct_ast_fg2_x", "pct_ast_fg3_x", "pct_fga_dunk_x", "fg_dunk_x", "pct_fga_layup_x", "fg_layup_x", 
    "pct_fg3a_corner_x", "fg3_pct_corner_x", "opp_avg_dist_x", "opp_pct_fga_fg2a_x", "opp_pct_fga_00_03_x", 
    "opp_pct_fga_03_10_x", "opp_pct_fga_10_16_x", "opp_pct_fga_16_xx_x", "opp_pct_fga_fg3a_x", "opp_fg_pct_00_03_x", 
    "opp_fg_pct_03_10_x", "opp_fg_pct_10_16_x", "opp_fg_pct_16_xx_x", "opp_pct_ast_fg2_x", "opp_pct_ast_fg3_x", 
    "opp_pct_fga_dunk_x", "opp_fg_dunk_x", "opp_pct_fga_layup_x", "opp_fg_layup_x", "opp_pct_fg3a_corner_x", 
    "opp_fg3_pct_corner_x", "g_y", "mp_y", "fg_y", "fga_y", "fg_pct_y", "fg3_y", "fg3a_y", "fg3_pct_y", "fg2_y", 
    "fg2a_y", "fg2_pct_y", "ft_y", "fta_y", "ft_pct_y", "orb_y", "drb_y", "trb_y", "ast_y", "stl_y", "blk_y", "tov_y", 
    "pf_y", "pts_y", "opp_fg_y", "opp_fga_y", "opp_fg_pct_y", "opp_fg3_y", "opp_fg3a_y", "opp_fg3_pct_y", "opp_fg2_y", 
    "opp_fg2a_y", "opp_fg2_pct_y", "opp_ft_y", "opp_fta_y", "opp_ft_pct_y", "opp_orb_y", "opp_drb_y", "opp_trb_y", 
    "opp_ast_y", "opp_stl_y", "opp_blk_y", "opp_tov_y", "opp_pf_y", "opp_pts_y", "age_y", "wins_y", "losses_y", 
    "wins_pyth_y", "losses_pyth_y", "mov_y", "sos_y", "srs_y", "off_rtg_y", "def_rtg_y", "net_rtg_y", "pace_y", 
    "fta_per_fga_pct_y", "fg3a_per_fga_pct_y", "ts_pct_y", "efg_pct_y", "tov_pct_y", "orb_pct_y", "ft_rate_y", 
    "opp_efg_pct_y", "opp_tov_pct_y", "drb_pct_y", "opp_ft_rate_y", "avg_dist_y", "pct_fga_fg2a_y", "pct_fga_00_03_y", 
    "pct_fga_03_10_y", "pct_fga_10_16_y", "pct_fga_16_xx_y", "pct_fga_fg3a_y", "fg_pct_00_03_y", "fg_pct_03_10_y", 
    "fg_pct_10_16_y", "fg_pct_16_xx_y", "pct_ast_fg2_y", "pct_ast_fg3_y", "pct_fga_dunk_y", "fg_dunk_y", 
    "pct_fga_layup_y", "fg_layup_y", "pct_fg3a_corner_y", "fg3_pct_corner_y", "opp_avg_dist_y", "opp_pct_fga_fg2a_y", 
    "opp_pct_fga_00_03_y", "opp_pct_fga_03_10_y", "opp_pct_fga_10_16_y", "opp_pct_fga_16_xx_y", "opp_pct_fga_fg3a_y", 
    "opp_fg_pct_00_03_y", "opp_fg_pct_03_10_y", "opp_fg_pct_10_16_y", "opp_fg_pct_16_xx_y", "opp_pct_ast_fg2_y", 
    "opp_pct_ast_fg3_y", "opp_pct_fga_dunk_y", "opp_fg_dunk_y", "opp_pct_fga_layup_y", "opp_fg_layup_y", 
    "opp_pct_fg3a_corner_y", "opp_fg3_pct_corner_y"
]