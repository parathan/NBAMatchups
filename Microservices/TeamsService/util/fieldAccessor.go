package util

import (
	"fmt"
	"reflect"

	teamspb "teams-service/proto"
)

func GetField(obj interface{}, fieldName  string) (interface{}, error) {
	// Get the value of the object.
	v := reflect.ValueOf(obj)

	// Check if the object is a pointer and dereference it.
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}

	// Get the field by name.
	field := v.FieldByName(fieldName)

	// Check if the field exists and is accessible.
	if !field.IsValid() {
		return nil, fmt.Errorf("no such field: %s in obj", fieldName)
	}

	return field.Interface(), nil
}

type Getter func(team *teamspb.Team) float32

// Using Getter method like this instead of GetField method above as reflect function
// may have extra overhead. While this is more code to maintain, these getter functions are O(1)
// lookup time, meaning it will not impact performance as much
var TeamAccess = map[string]Getter{
	"fg": func(team *teamspb.Team) float32 { return team.Fg },
    "opp_fg": func(team *teamspb.Team) float32 { return team.OppFg },
    "fga": func(team *teamspb.Team) float32 { return team.Fga },
    "opp_fga": func(team *teamspb.Team) float32 { return team.OppFga },
    "fg_pct": func(team *teamspb.Team) float32 { return team.FgPct },
    "opp_fg_pct": func(team *teamspb.Team) float32 { return team.OppFgPct },
    "fg3": func(team *teamspb.Team) float32 { return team.Fg3 },
    "opp_fg3": func(team *teamspb.Team) float32 { return team.OppFg3 },
    "fg3a": func(team *teamspb.Team) float32 { return team.Fg3A },
    "opp_fg3a": func(team *teamspb.Team) float32 { return team.OppFg3A },
    "fg3_pct": func(team *teamspb.Team) float32 { return team.Fg3Pct },
    "opp_fg3_pct": func(team *teamspb.Team) float32 { return team.OppFg3Pct },
    "fg2": func(team *teamspb.Team) float32 { return team.Fg2 },
    "opp_fg2": func(team *teamspb.Team) float32 { return team.OppFg2 },
    "fg2a": func(team *teamspb.Team) float32 { return team.Fg2A },
    "opp_fg2a": func(team *teamspb.Team) float32 { return team.OppFg2A },
    "fg2_pct": func(team *teamspb.Team) float32 { return team.Fg2Pct },
    "opp_fg2_pct": func(team *teamspb.Team) float32 { return team.OppFg2Pct },
    "ft": func(team *teamspb.Team) float32 { return team.Ft },
    "opp_ft": func(team *teamspb.Team) float32 { return team.OppFt },
    "fta": func(team *teamspb.Team) float32 { return team.Fta },
    "opp_fta": func(team *teamspb.Team) float32 { return team.OppFta },
    "ft_pct": func(team *teamspb.Team) float32 { return team.FtPct },
    "opp_ft_pct": func(team *teamspb.Team) float32 { return team.OppFtPct },
    "orb": func(team *teamspb.Team) float32 { return team.Orb },
    "opp_orb": func(team *teamspb.Team) float32 { return team.OppOrb },
    "drb": func(team *teamspb.Team) float32 { return team.Drb },
    "opp_drb": func(team *teamspb.Team) float32 { return team.OppDrb },
    "trb": func(team *teamspb.Team) float32 { return team.Trb },
    "opp_trb": func(team *teamspb.Team) float32 { return team.OppTrb },
    "ast": func(team *teamspb.Team) float32 { return team.Ast },
    "opp_ast": func(team *teamspb.Team) float32 { return team.OppAst },
    "stl": func(team *teamspb.Team) float32 { return team.Stl },
    "opp_stl": func(team *teamspb.Team) float32 { return team.OppStl },
    "blk": func(team *teamspb.Team) float32 { return team.Blk },
    "opp_blk": func(team *teamspb.Team) float32 { return team.OppBlk },
    "tov": func(team *teamspb.Team) float32 { return team.Tov },
    "opp_tov": func(team *teamspb.Team) float32 { return team.OppTov },
    "pf": func(team *teamspb.Team) float32 { return team.Pf },
    "opp_pf": func(team *teamspb.Team) float32 { return team.OppPf },
    "pts": func(team *teamspb.Team) float32 { return team.Pts },
    "opp_pts": func(team *teamspb.Team) float32 { return team.OppPts },
    "avg_dist": func(team *teamspb.Team) float32 { return team.AvgDist },
    "opp_avg_dist": func(team *teamspb.Team) float32 { return team.OppAvgDist },
    "pct_fga_fg2a": func(team *teamspb.Team) float32 { return team.PctFgaFg2A },
    "opp_pct_fga_fg2a": func(team *teamspb.Team) float32 { return team.OppPctFgaFg2A },
    "pct_fga_00_03": func(team *teamspb.Team) float32 { return team.PctFga_00_03 },
    "opp_pct_fga_00_03": func(team *teamspb.Team) float32 { return team.OppPctFga_00_03 },
    "pct_fga_03_10": func(team *teamspb.Team) float32 { return team.PctFga_03_10 },
    "opp_pct_fga_03_10": func(team *teamspb.Team) float32 { return team.OppPctFga_03_10 },
    "pct_fga_10_16": func(team *teamspb.Team) float32 { return team.PctFga_10_16 },
    "opp_pct_fga_10_16": func(team *teamspb.Team) float32 { return team.OppPctFga_10_16 },
    "pct_fga_16_xx": func(team *teamspb.Team) float32 { return team.PctFga_16Xx },
    "opp_pct_fga_16_xx": func(team *teamspb.Team) float32 { return team.OppPctFga_16Xx },
    "pct_fga_fg3a": func(team *teamspb.Team) float32 { return team.PctFgaFg3A },
    "opp_pct_fga_fg3a": func(team *teamspb.Team) float32 { return team.OppPctFgaFg3A },
    "fg_pct_00_03": func(team *teamspb.Team) float32 { return team.FgPct_00_03 },
    "opp_fg_pct_00_03": func(team *teamspb.Team) float32 { return team.OppFgPct_00_03 },
    "fg_pct_03_10": func(team *teamspb.Team) float32 { return team.FgPct_03_10 },
    "opp_fg_pct_03_10": func(team *teamspb.Team) float32 { return team.OppFgPct_03_10 },
    "fg_pct_10_16": func(team *teamspb.Team) float32 { return team.FgPct_10_16 },
    "opp_fg_pct_10_16": func(team *teamspb.Team) float32 { return team.OppFgPct_10_16 },
    "fg_pct_16_xx": func(team *teamspb.Team) float32 { return team.FgPct_16Xx },
    "opp_fg_pct_16_xx": func(team *teamspb.Team) float32 { return team.OppFgPct_16Xx },
    "pct_ast_fg2": func(team *teamspb.Team) float32 { return team.PctAstFg2 },
    "opp_pct_ast_fg2": func(team *teamspb.Team) float32 { return team.OppPctAstFg2 },
    "pct_ast_fg3": func(team *teamspb.Team) float32 { return team.PctAstFg3 },
    "opp_pct_ast_fg3": func(team *teamspb.Team) float32 { return team.OppPctAstFg3 },
    "pct_fga_dunk": func(team *teamspb.Team) float32 { return team.PctFgaDunk },
    "opp_pct_fga_dunk": func(team *teamspb.Team) float32 { return team.OppPctFgaDunk },
    "fg_dunk": func(team *teamspb.Team) float32 { return team.FgDunk },
    "opp_fg_dunk": func(team *teamspb.Team) float32 { return team.OppFgDunk },
    "fg_layup": func(team *teamspb.Team) float32 { return team.FgLayup },
    "opp_fg_layup": func(team *teamspb.Team) float32 { return team.OppFgLayup },
    "pct_fg3a_corner": func(team *teamspb.Team) float32 { return team.PctFg3ACorner },
    "opp_pct_fg3a_corner": func(team *teamspb.Team) float32 { return team.OppPctFg3ACorner },
    "fg3_pct_corner": func(team *teamspb.Team) float32 { return team.Fg3PctCorner },
    "opp_fg3_pct_corner": func(team *teamspb.Team) float32 { return team.OppFg3PctCorner },
	"efg_pct": func(team *teamspb.Team) float32 { return team.EfgPct },
	"tov_pct": func(team *teamspb.Team) float32 { return team.TovPct },
	"orb_pct": func(team *teamspb.Team) float32 { return team.OrbPct },
	"ft_rate": func(team *teamspb.Team) float32 { return team.FtRate },
	"opp_efg_pct": func(team *teamspb.Team) float32 { return team.OppEfgPct },
	"opp_tov_pct": func(team *teamspb.Team) float32 { return team.OppTovPct },
	"drb_pct": func(team *teamspb.Team) float32 { return team.DrbPct },
	"opp_ft_rate": func(team *teamspb.Team) float32 { return team.OppFtRate },
}