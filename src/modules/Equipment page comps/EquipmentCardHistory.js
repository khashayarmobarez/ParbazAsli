import React from 'react';

// styles
import ButtonStyles from '../../styles/ButtonsBox.module.css';

// context
import { useTranslation } from '../../Utilities/context/TranslationContext';


const EquipmentCardHistory = ({ equipment, equipmentType, handleEditEquipment  }) => {
    
    const { t } = useTranslation();

    return (
        <div className='w-full flex flex-col gap-4'>
            <div key={equipment.id} className={`w-full justify-between items-center px-2 py-4 rounded-[34px] flex gap-y-4 md:col-span-1 bg-bgCard`}
                style={{ boxShadow: 'var(--shadow-all)' }}>
                <div className='w-auto text-xs flex flex-col justify-between items-start gap-y-2'>
                    <p className='text-start'>
                        {t('equipment.brandModel', { brand: equipment.brand, model: equipment.model })}
                        {equipmentType === "Wing" && ` / ${t('equipment.wingClass', { wingClass: equipment.wingClass })}`}
                    </p>
                    <p>{t('equipment.serialNumber', { serialNumber: equipment.serialNumber })}</p>
                </div>
                <div className='w-auto text-xs flex justify-between items-start gap-y-1'>
                    <button className={`${ButtonStyles.normalButton}`} onClick={handleEditEquipment(equipment.id)}>
                        {(equipment.serialStatus === 'None' || equipment.serialStatus === 'Rejected') ?
                            t('equipment.edit')
                            :
                            t('equipment.details')
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EquipmentCardHistory;