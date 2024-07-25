package database

type TotalTeamData struct {
	TeamName string     `json:"teamname" validate:"required"`
	Stats    []TeamData `json:"Stats" validate:"required"`
}

type TwoTeamData struct {
	FirstTeam  TeamData `json:"firstTeam" validate:"required"`
	SecondTeam TeamData `json:"secondTeam" validate:"required"`
}

type TeamData struct {
	ID               string  `json:"_id" bson:"_id" validate:"required"`
	NAME             string  `json:"Name" bson:"Name" validate:"required"`
	YEAR             float64 `json:"year" bson:"year" validate:"required"`
	G                float64 `json:"g" bson:"g" validate:"required"`
	MP               float64 `json:"mp" bson:"mp" validate:"required"`
	FG               float64 `json:"fg" bson:"fg" validate:"required"`
	FGA              float64 `json:"fga" bson:"fga" validate:"required"`
	FGPct            float64 `json:"fg_pct" bson:"fg_pct" validate:"required"`
	FG3              float64 `json:"fg3" bson:"fg3" validate:"required"`
	FG3A             float64 `json:"fg3a" bson:"fg3a" validate:"required"`
	FG3Pct           float64 `json:"fg3_pct" bson:"fg3_pct" validate:"required"`
	FG2              float64 `json:"fg2" bson:"fg2" validate:"required"`
	FG2A             float64 `json:"fg2a" bson:"fg2a" validate:"required"`
	FG2Pct           float64 `json:"fg2_pct" bson:"fg2_pct" validate:"required"`
	FT               float64 `json:"ft" bson:"ft" validate:"required"`
	FTA              float64 `json:"fta" bson:"fta" validate:"required"`
	FTPct            float64 `json:"ft_pct" bson:"ft_pct" validate:"required"`
	ORB              float64 `json:"orb" bson:"orb" validate:"required"`
	DRB              float64 `json:"drb" bson:"drb" validate:"required"`
	TRB              float64 `json:"trb" bson:"trb" validate:"required"`
	AST              float64 `json:"ast" bson:"ast" validate:"required"`
	STL              float64 `json:"stl" bson:"stl" validate:"required"`
	BLK              float64 `json:"blk" bson:"blk" validate:"required"`
	TOV              float64 `json:"tov" bson:"tov" validate:"required"`
	PF               float64 `json:"pf" bson:"pf" validate:"required"`
	PTS              float64 `json:"pts" bson:"pts" validate:"required"`
	OppFG            float64 `json:"opp_fg" bson:"opp_fg" validate:"required"`
	OppFGA           float64 `json:"opp_fga" bson:"opp_fga" validate:"required"`
	OppFGPct         float64 `json:"opp_fg_pct" bson:"opp_fg_pct" validate:"required"`
	OppFG3           float64 `json:"opp_fg3" bson:"opp_fg3" validate:"required"`
	OppFG3A          float64 `json:"opp_fg3a" bson:"opp_fg3a" validate:"required"`
	OppFG3Pct        float64 `json:"opp_fg3_pct" bson:"opp_fg3_pct" validate:"required"`
	OppFG2           float64 `json:"opp_fg2" bson:"opp_fg2" validate:"required"`
	OppFG2A          float64 `json:"opp_fg2a" bson:"opp_fg2a" validate:"required"`
	OppFG2Pct        float64 `json:"opp_fg2_pct" bson:"opp_fg2_pct" validate:"required"`
	OppFT            float64 `json:"opp_ft" bson:"opp_ft" validate:"required"`
	OppFTA           float64 `json:"opp_fta" bson:"opp_fta" validate:"required"`
	OppFTPct         float64 `json:"opp_ft_pct" bson:"opp_ft_pct" validate:"required"`
	OppORB           float64 `json:"opp_orb" bson:"opp_orb" validate:"required"`
	OppDRB           float64 `json:"opp_drb" bson:"opp_drb" validate:"required"`
	OppTRB           float64 `json:"opp_trb" bson:"opp_trb" validate:"required"`
	OppAST           float64 `json:"opp_ast" bson:"opp_ast" validate:"required"`
	OppSTL           float64 `json:"opp_stl" bson:"opp_stl" validate:"required"`
	OppBLK           float64 `json:"opp_blk" bson:"opp_blk" validate:"required"`
	OppTOV           float64 `json:"opp_tov" bson:"opp_tov" validate:"required"`
	OppPF            float64 `json:"opp_pf" bson:"opp_pf" validate:"required"`
	OppPTS           float64 `json:"opp_pts" bson:"opp_pts" validate:"required"`
	Age              float64 `json:"age" bson:"age" validate:"required"`
	Wins             float64 `json:"wins" bson:"wins" validate:"required"`
	Losses           float64 `json:"losses" bson:"losses" validate:"required"`
	WinsPyth         float64 `json:"wins_pyth" bson:"wins_pyth" validate:"required"`
	LossesPyth       float64 `json:"losses_pyth" bson:"losses_pyth" validate:"required"`
	MOV              float64 `json:"mov" bson:"mov" validate:"required"`
	SOS              float64 `json:"sos" bson:"sos" validate:"required"`
	SRS              float64 `json:"srs" bson:"srs" validate:"required"`
	OffRtg           float64 `json:"off_rtg" bson:"off_rtg" validate:"required"`
	DefRtg           float64 `json:"def_rtg" bson:"def_rtg" validate:"required"`
	NetRtg           float64 `json:"net_rtg" bson:"net_rtg" validate:"required"`
	Pace             float64 `json:"pace" bson:"pace" validate:"required"`
	FTAPerFGAPct     float64 `json:"fta_per_fga_pct" bson:"fta_per_fga_pct" validate:"required"`
	FG3APerFGAPct    float64 `json:"fg3a_per_fga_pct" bson:"fg3a_per_fga_pct" validate:"required"`
	TSPct            float64 `json:"ts_pct" bson:"ts_pct" validate:"required"`
	EFGPct           float64 `json:"efg_pct" bson:"efg_pct" validate:"required"`
	TOVPct           float64 `json:"tov_pct" bson:"tov_pct" validate:"required"`
	ORBPct           float64 `json:"orb_pct" bson:"orb_pct" validate:"required"`
	FTRate           float64 `json:"ft_rate" bson:"ft_rate" validate:"required"`
	OppEFGPct        float64 `json:"opp_efg_pct" bson:"opp_efg_pct" validate:"required"`
	OppTOVPct        float64 `json:"opp_tov_pct" bson:"opp_tov_pct" validate:"required"`
	DRBPct           float64 `json:"drb_pct" bson:"drb_pct" validate:"required"`
	OppFTRate        float64 `json:"opp_ft_rate" bson:"opp_ft_rate" validate:"required"`
	AvgDist          float64 `json:"avg_dist" bson:"avg_dist" validate:"required"`
	PctFGA2A         float64 `json:"pct_fga_fg2a" bson:"pct_fga_fg2a" validate:"required"`
	PctFGA003        float64 `json:"pct_fga_00_03" bson:"pct_fga_00_03" validate:"required"`
	PctFGA0310       float64 `json:"pct_fga_03_10" bson:"pct_fga_03_10" validate:"required"`
	PctFGA1016       float64 `json:"pct_fga_10_16" bson:"pct_fga_10_16" validate:"required"`
	PctFGA16XX       float64 `json:"pct_fga_16_xx" bson:"pct_fga_16_xx" validate:"required"`
	PctFGA3A         float64 `json:"pct_fga_fg3a" bson:"pct_fga_fg3a" validate:"required"`
	FGPct003         float64 `json:"fg_pct_00_03" bson:"fg_pct_00_03" validate:"required"`
	FGPct0310        float64 `json:"fg_pct_03_10" bson:"fg_pct_03_10" validate:"required"`
	FGPct1016        float64 `json:"fg_pct_10_16" bson:"fg_pct_10_16" validate:"required"`
	FGPct16XX        float64 `json:"fg_pct_16_xx" bson:"fg_pct_16_xx" validate:"required"`
	PctASTFG2        float64 `json:"pct_ast_fg2" bson:"pct_ast_fg2" validate:"required"`
	PctASTFG3        float64 `json:"pct_ast_fg3" bson:"pct_ast_fg3" validate:"required"`
	PctFGADunk       float64 `json:"pct_fga_dunk" bson:"pct_fga_dunk" validate:"required"`
	FGDunk           float64 `json:"fg_dunk" bson:"fg_dunk" validate:"required"`
	PctFGALayup      float64 `json:"pct_fga_layup" bson:"pct_fga_layup" validate:"required"`
	FGLayup          float64 `json:"fg_layup" bson:"fg_layup" validate:"required"`
	PctFG3ACorner    float64 `json:"pct_fg3a_corner" bson:"pct_fg3a_corner" validate:"required"`
	FG3PctCorner     float64 `json:"fg3_pct_corner" bson:"fg3_pct_corner" validate:"required"`
	OppAvgDist       float64 `json:"opp_avg_dist" bson:"opp_avg_dist" validate:"required"`
	OppPctFGA2A      float64 `json:"opp_pct_fga_fg2a" bson:"opp_pct_fga_fg2a" validate:"required"`
	OppPctFGA003     float64 `json:"opp_pct_fga_00_03" bson:"opp_pct_fga_00_03" validate:"required"`
	OppPctFGA0310    float64 `json:"opp_pct_fga_03_10" bson:"opp_pct_fga_03_10" validate:"required"`
	OppPctFGA1016    float64 `json:"opp_pct_fga_10_16" bson:"opp_pct_fga_10_16" validate:"required"`
	OppPctFGA16XX    float64 `json:"opp_pct_fga_16_xx" bson:"opp_pct_fga_16_xx" validate:"required"`
	OppPctFGA3A      float64 `json:"opp_pct_fga_fg3a" bson:"opp_pct_fga_fg3a" validate:"required"`
	OppFGPct003      float64 `json:"opp_fg_pct_00_03" bson:"opp_fg_pct_00_03" validate:"required"`
	OppFGPct0310     float64 `json:"opp_fg_pct_03_10" bson:"opp_fg_pct_03_10" validate:"required"`
	OppFGPct1016     float64 `json:"opp_fg_pct_10_16" bson:"opp_fg_pct_10_16" validate:"required"`
	OppFGPct16XX     float64 `json:"opp_fg_pct_16_xx" bson:"opp_fg_pct_16_xx" validate:"required"`
	OppPctASTFG2     float64 `json:"opp_pct_ast_fg2" bson:"opp_pct_ast_fg2" validate:"required"`
	OppPctASTFG3     float64 `json:"opp_pct_ast_fg3" bson:"opp_pct_ast_fg3" validate:"required"`
	OppPctFGADunk    float64 `json:"opp_pct_fga_dunk" bson:"opp_pct_fga_dunk" validate:"required"`
	OppFGDunk        float64 `json:"opp_fg_dunk" bson:"opp_fg_dunk" validate:"required"`
	OppPctFGALayup   float64 `json:"opp_pct_fga_layup" bson:"opp_pct_fga_layup" validate:"required"`
	OppFGLayup       float64 `json:"opp_fg_layup" bson:"opp_fg_layup" validate:"required"`
	OppPctFG3ACorner float64 `json:"opp_pct_fg3a_corner" bson:"opp_pct_fg3a_corner" validate:"required"`
	OppFG3PctCorner  float64 `json:"opp_fg3_pct_corner" bson:"opp_fg3_pct_corner" validate:"required"`
}