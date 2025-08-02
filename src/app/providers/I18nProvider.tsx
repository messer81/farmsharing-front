//🌍 Локализация
// Провайдер i18next для поддержки многоязычности
import { I18nextProvider } from 'react-i18next';
import i18n from '../../shared/config/i18n/i18n';
import type { ReactNode } from 'react';

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
};