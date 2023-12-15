// Array of pairs of fields that are opposing stats to be compared.
export const opposingStats = () => {
    const originalStats = [
        'fg',
        'fga',
        'fg_pct',
        'fg3',
        'fg3a',
        'fg3_pct',
        'fg2',
        'fg2a',
        'fg2_pct',
        'ft',
        'fta',
        'ft_pct',
        'orb',
        'drb',
        'trb',
        'ast',
        'stl',
        'blk',
        'tov',
        'pf',
        'pts'
    ]
    const shootingStats = [
        'avg_dist',
        'pct_fga_fg2a',
        'pct_fga_00_03',
        'pct_fga_03_10',
        'pct_fga_10_16',
        'pct_fga_16_xx',
        'pct_fga_fg3a',
        'fg_pct_00_03',
        'fg_pct_03_10',
        'fg_pct_10_16',
        'fg_pct_16_xx',
        'pct_ast_fg2',
        'pct_ast_fg3',
        'pct_fga_dunk',
        'fg_dunk',
        'fg_layup',
        'pct_fg3a_corner',
        'fg3_pct_corner'
    ]
    var opposingStats = []
    for (const field of originalStats) {
        opposingStats.push([field, 'opp_' + field])
        opposingStats.push(['opp_' + field, field])
    }
    for (const field of shootingStats) {
        opposingStats.push([field, 'opp_' + field])
        opposingStats.push(['opp_' + field, field])
    }
    opposingStats.push(['efg_pct', 'opp_efg_pct'])
    opposingStats.push(['tov_pct', 'opp_tov_pct'])
    opposingStats.push(['orb_pct', 'drb_pct'])
    opposingStats.push(['ft_rate', 'opp_ft_rate'])
    opposingStats.push(['opp_efg_pct', 'efg_pct'])
    opposingStats.push(['opp_tov_pct', 'tov_pct'])
    opposingStats.push(['drb_pct', 'orb_pct'])
    opposingStats.push(['opp_ft_rate', 'ft_rate'])
    
    return opposingStats

}