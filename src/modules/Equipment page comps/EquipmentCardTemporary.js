import React from 'react';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const EquipmentCardTemporary = ({ equipment, equipmentType, handleEditEquipment, loadingReturnEquipment, handleReturnEquipment }) => {

    const { t } = useTranslation();

    return (
        <div key={equipment.id} className='w-full flex flex-col gap-4 md:grid md:grid-cols-2'>
            <div className={`w-full justify-between items-center px-5 py-4 rounded-[34px] flex flex-col gap-y-4 md:col-span-1 bg-bgCard`}
                style={{ boxShadow: 'var(--shadow-all)' }}>
                <p className='font-medium text-sm'>{t('equipment.daysToExpire', { daysToExpire: equipment.remainingDaysToExpire })}</p>
                <div className='w-full text-xs flex justify-between items-start gap-y-1'>
                    <p className='text-start'>
                        {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                        {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                    </p>
                    <p>{t('equipment.flightCountDuration', { flightCount: equipment.flightCount, flightDuration: equipment.flightDuration })}</p>
                </div>
                <div className='w-full text-xs flex justify-between items-start gap-y-1'>
                    <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)}>
                        {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                            t('equipment.edit')
                            :
                            t('equipment.details')
                        }
                    </button>
                    <button 
                    className={`${ButtonStyles.normalButton} ${loadingReturnEquipment && 'opacity-55'}`} 
                    disabled={loadingReturnEquipment} 
                    onClick={handleReturnEquipment(equipment.id)}>
                        {t('equipment.return')}
                    </button>
                </div>
            </div>
        </div>
    );

};

export default EquipmentCardTemporary;