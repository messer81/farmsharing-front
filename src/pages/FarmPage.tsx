import { FarmProfile } from '../entities/farm/ui/FarmProfile.tsx';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { useGetFarmByIdQuery } from '../shared/api';
import { useTranslation } from 'react-i18next';

const FarmPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const params = useParams();
    const farmId = Number(params.id) || 1;
    const { data: farm, isLoading, error } = useGetFarmByIdQuery(farmId);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: theme.palette.background.pagesBackground,
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="container mx-auto p-4">
                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                  </Box>
                )}
                {error && (
                  <Typography color="error">{t('farm.loadError')}</Typography>
                )}
                {farm && <FarmProfile farm={farm} />}
            </div>
        </Box>
    );
};

export default FarmPage;